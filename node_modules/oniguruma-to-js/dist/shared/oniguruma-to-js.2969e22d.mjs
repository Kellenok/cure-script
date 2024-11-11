import { rewrite } from 'regex';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RegExpConversionError extends SyntaxError {
  constructor(message, options) {
    super(message, { cause: options.cause });
    __publicField(this, "patternOriginal");
    __publicField(this, "patternConverted");
    __publicField(this, "cursorPosition");
    this.patternOriginal = options.pattern;
    this.patternConverted = options.converted;
    this.cursorPosition = options.cursor;
  }
}

const UNNECESSARY_ESCAPE_CHAR_CLASS = new Set("!?:=+$(){}_><# ");
const UNNECESSARY_ESCAPE = new Set("-!:=_>< ");
const TABLE_POSIX = {
  alnum: "0-9A-Za-z",
  alpha: "A-Za-z",
  ascii: "\0-\x7F",
  blank: " \\t",
  cntrl: "\0-\x7F",
  digit: "\\d",
  graph: "!-~",
  lower: "a-z",
  print: " -~",
  punct: "!-/:-@[-`{-~",
  space: "\\s",
  upper: "A-Z",
  xdigit: "0-9A-Fa-f",
  word: "\\w"
};
const TABLE_SLASH_P = {
  alnum: "0-9A-Za-z",
  alpha: "A-Za-z",
  alphabetic: "A-Za-z",
  blank: "\\s",
  greek: "\\p{Script=Greek}",
  print: "\\p{L}\\p{N}\\p{P}\\p{S}\\p{Zs}",
  word: "\\w"
};
const KNOWN_FLAGS = /* @__PURE__ */ new Set("gimsuyx");
function syntaxLowering(input, options = {}) {
  const {
    useRegex = false,
    preserveFlags = false,
    removePossessiveQuantifier = false,
    removeAtomicGroup = false,
    convertHexDigitsShorthand = false,
    convertUnicodeCategory = false,
    expandNestedCharacterClass = false
  } = options;
  let output = "";
  const flags = /* @__PURE__ */ new Set();
  const stack = [];
  const freeSpacingLocal = [];
  let freeSpacingGlobal = false;
  let isInNestedCharClass = false;
  let i = 0;
  try {
    while (i < input.length) {
      const char = input[i];
      while (freeSpacingLocal.length && freeSpacingLocal[0] > stack.length) {
        freeSpacingLocal.shift();
      }
      const head = stack[0];
      const freeSpacing = freeSpacingGlobal || freeSpacingLocal.length;
      if (char === "\\") {
        if (convertHexDigitsShorthand) {
          if (input[i + 1] === "h") {
            const body = `0-9A-Fa-f`;
            if (head === "[") {
              output += body;
            } else {
              output += `[${body}]`;
            }
            i += 2;
            continue;
          }
          if (input[i + 1] === "H") {
            if (head === "[") {
              throw new RegExpConversionError(
                "Expending \\H in character class is not supported",
                { pattern: input, converted: output, cursor: i }
              );
            } else {
              output += `[^0-9A-Fa-f]`;
            }
            i += 2;
            continue;
          }
        }
        if (convertUnicodeCategory && input[i + 1] === "p" && input[i + 2] === "{") {
          const end = input.indexOf("}", i + 3);
          if (end === -1) {
            throw new RegExpConversionError(
              "Unmatched \\p{...}",
              { pattern: input, converted: output, cursor: i }
            );
          }
          const name = input.slice(i + 3, end);
          const resolved = TABLE_SLASH_P[name.toLowerCase()];
          if (resolved) {
            if (head === "[") {
              output += resolved;
            } else {
              output += `[${resolved}]`;
            }
            i = end + 1;
            continue;
          }
        }
        if (head === "[" && UNNECESSARY_ESCAPE_CHAR_CLASS.has(input[i + 1])) {
          output += input[i + 1];
          i += 2;
          continue;
        }
        if (head !== "[" && UNNECESSARY_ESCAPE.has(input[i + 1])) {
          output += input[i + 1];
          i += 2;
          continue;
        }
        output += char + input[i + 1];
        i += 2;
        continue;
      }
      if (char === "#" && freeSpacing && input[i - 1].match(/\s/) && head !== "[") {
        for (let j = i + 1; j <= input.length; j++) {
          if (input[j] === "\n" || j === input.length) {
            i = j;
            break;
          }
        }
        continue;
      }
      if (char === "(" && head !== "[") {
        if (input[i + 1] === "?") {
          if (input[i + 2] === "#") {
            for (let j = i + 3; j < input.length; j++) {
              if (input[j] === ")" && input[j - 1] !== "\\") {
                i = j + 1;
                break;
              }
            }
            continue;
          }
          if (removeAtomicGroup && input[i + 2] === ">") {
            output += "(?:";
            i += 3;
            continue;
          }
          if (KNOWN_FLAGS.has(input[i + 2])) {
            let end = i + 3;
            for (; end < input.length; end++) {
              if (!KNOWN_FLAGS.has(input[end]))
                break;
            }
            const flagStr2 = input.slice(i + 2, end);
            const hasX = flagStr2.includes("x") && flagStr2[0] !== "-";
            let remainFlags = [...flagStr2].filter((x) => x !== "x").join("");
            if (!preserveFlags) {
              if (remainFlags[0] === "-") {
                remainFlags = remainFlags.slice(1);
                for (const flag of flagStr2) {
                  flags.delete(flag);
                }
              } else {
                for (const flag of remainFlags) {
                  flags.add(flag);
                }
              }
              remainFlags = "";
            }
            if (input[end] === ")") {
              i = end + 1;
              if (hasX) {
                freeSpacingGlobal = true;
              }
              if (remainFlags.length) {
                output += `(?${remainFlags})`;
              }
              continue;
            } else if (input[end] === ":") {
              i = end + 1;
              stack.unshift(char);
              if (hasX) {
                freeSpacingLocal.unshift(stack.length);
              }
              output += `(?${remainFlags}:`;
              continue;
            }
          }
          stack.unshift(char);
          output += char + input[i + 1] + input[i + 2];
          i += 3;
        } else {
          stack.unshift(char);
          output += char;
          i += 1;
        }
        continue;
      }
      if (char === ")" && head !== "[") {
        if (head === "(")
          stack.shift();
        output += char;
        i += 1;
        continue;
      }
      if (char === "[") {
        if (input[i + 1] === ":") {
          let name = "";
          let negated = false;
          if (input[i + 2] === "^") {
            negated = true;
            i += 1;
          }
          for (let j = i + 2; j < input.length; j++) {
            if (input[j] === ":") {
              i = j + 2;
              break;
            }
            if (!input[j].match(/[a-z]/i)) {
              name = "";
              break;
            }
            name += input[j];
          }
          if (name) {
            let resolved = TABLE_POSIX[name];
            if (!resolved) {
              throw new RegExpConversionError(
                `Unknown posix class "${name}"`,
                { pattern: input, converted: output, cursor: i }
              );
            }
            if (negated)
              resolved = `^${resolved}`;
            if (head === "[")
              output += resolved;
            else
              output += `[${resolved}]`;
            continue;
          }
        }
        if (head !== "[") {
          stack.unshift(char);
        }
        if (head === "[" && expandNestedCharacterClass) {
          isInNestedCharClass = true;
          i += 1;
          if (input[i] === "-") {
            output += "\\-";
            i += 1;
          }
          continue;
        }
        output += char;
        i += 1;
        continue;
      }
      if (char === "]") {
        if (isInNestedCharClass) {
          isInNestedCharClass = false;
          i += 1;
          continue;
        }
        if (head === "[")
          stack.shift();
        output += char;
        i += 1;
        continue;
      }
      if (removePossessiveQuantifier && char === "+" && head !== "[") {
        if ("?+}*".includes(input[i - 1])) {
          i += 1;
          continue;
        }
      }
      if (char === "*" && head !== "[" && input[i - 1] === "|" && input[i - 2] !== "\\") {
        output += "\\";
      }
      if (!(freeSpacing && head !== "[" && char.match(/\s/))) {
        output += char;
      }
      i += 1;
    }
  } catch (e) {
    if (e instanceof RegExpConversionError)
      throw e;
    throw new RegExpConversionError(
      `Error lowering regex at position ${i}`,
      { pattern: input, converted: output, cursor: i, cause: e }
    );
  }
  const flagStr = [...flags].join("");
  if (useRegex) {
    output = rewrite(
      output,
      {
        flags: flagStr,
        unicodeSetsPlugin: null,
        disable: {
          n: true,
          v: true,
          x: true
        }
      }
    ).expression;
  }
  return {
    pattern: output,
    flags: flagStr
  };
}

export { RegExpConversionError as R, syntaxLowering as s };
