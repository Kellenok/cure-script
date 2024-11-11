const KNOWN_FLAGS = /* @__PURE__ */ new Set("gimsuyx");
const FEATURES_SUPPORTED_BY_JS = [
  "(?:",
  "(?!",
  "(?<!",
  "(?<",
  "(?<=",
  "(?=",
  "\\1",
  "\\2",
  "\\3",
  "\\4",
  "\\5",
  "\\b",
  "\\B",
  "\\d",
  "\\D",
  "\\n",
  "\\r",
  "\\s",
  "\\S",
  "\\t",
  "\\w",
  "\\W",
  "g",
  "i",
  "m"
];
const FEATURES_POLYFILLABLE = [
  "x",
  "\\x",
  "\\h",
  "\\H",
  "\\A",
  "(?#",
  // Atomic Group
  "(?>",
  // Possessive quantifiers
  "*+",
  "++",
  "?+",
  "}+",
  // POSIX
  "[:alnum:]",
  "[:alpha:]",
  "[:ascii:]",
  "[:blank:]",
  "[:cntrl:]",
  "[:digit:]",
  "[:graph:]",
  "[:lower:]",
  "[:print:]",
  "[:punct:]",
  "[:space:]",
  "[:upper:]",
  "[:xdigit:]",
  "[:word:]"
];
const KNOWN_GROUP_MODIFIDERS = [
  "<=",
  "<!",
  "!=",
  ":",
  "<",
  ">",
  "=",
  "^",
  "#",
  "!",
  "@"
];
function detectRegexFeatures(input, options = {}) {
  const structural = detectRegexFeaturesStrcutural(input);
  if (options.structural)
    return structural;
  return structuralFeaturesToFlat(structural, options.featuresSet);
}
function detectRegexFeaturesStrcutural(patterns) {
  const backslashes = /* @__PURE__ */ new Set();
  const posixBrackets = /* @__PURE__ */ new Set();
  const groupModifiers = /* @__PURE__ */ new Set();
  const possessiveQuantifiers = /* @__PURE__ */ new Set();
  const flagModifiers = /* @__PURE__ */ new Set();
  const result = {};
  for (const input of Array.isArray(patterns) ? patterns : [patterns]) {
    const stack = [];
    const freeSpacingLocal = [];
    let freeSpacingGlobal = false;
    let i = 0;
    while (i < input.length) {
      const char = input[i];
      const head = stack[0];
      const freeSpacing = freeSpacingGlobal || freeSpacingLocal.length;
      if (char === "\\") {
        if (input[i + 1].match(/[a-z]/i)) {
          backslashes.add(input[i + 1]);
        } else if (input[i + 1].match(/\d/)) {
          let parts = input[i + 1];
          let j = i + 2;
          while (input[j] && input[j].match(/\d/)) {
            parts += input[j];
            j += 1;
          }
          backslashes.add(parts);
        }
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
          const next = input.slice(i + 2, i + 5);
          for (const modifier of KNOWN_GROUP_MODIFIDERS) {
            if (next.startsWith(modifier))
              groupModifiers.add(modifier);
          }
          if (input[i + 2] === "#") {
            for (let j = i + 3; j < input.length; j++) {
              if (input[j] === ")" && input[j - 1] !== "\\") {
                i = j + 1;
                break;
              }
            }
            continue;
          }
          if (KNOWN_FLAGS.has(input[i + 2])) {
            let end = i + 3;
            for (; end < input.length; end++) {
              if (!KNOWN_FLAGS.has(input[end]))
                break;
            }
            const flagStr = input.slice(i + 2, end);
            for (const flag of flagStr)
              flagModifiers.add(flag);
            const hasX = flagStr.includes("x") && flagStr[0] !== "-";
            const remainFlags = [...flagStr].filter((x) => x !== "x").join("");
            for (const flag of remainFlags) {
              flagModifiers.add(flag);
            }
            if (input[end] === ")") {
              i = end + 1;
              if (hasX) {
                freeSpacingGlobal = true;
              }
              continue;
            } else if (input[end] === ":") {
              i = end + 1;
              stack.unshift(char);
              if (hasX) {
                freeSpacingLocal.unshift(stack.length);
              }
              continue;
            }
            stack.unshift(char);
            i += 3;
          } else {
            stack.unshift(char);
            i += 1;
          }
          continue;
        }
      }
      if (char === ")" && head !== "[") {
        if (head === "(")
          stack.shift();
        i += 1;
        continue;
      }
      if (char === "[") {
        if (input[i + 1] === ":") {
          let name = "";
          if (input[i + 2] === "^") {
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
            posixBrackets.add(name);
            continue;
          }
        }
        if (head !== "[") {
          stack.unshift(char);
        }
        i += 1;
        continue;
      }
      if (char === "]") {
        if (head === "[")
          stack.shift();
        i += 1;
        continue;
      }
      if (char === "+" && head !== "[") {
        if ("?+}*".includes(input[i - 1])) {
          possessiveQuantifiers.add(input[i - 1]);
          i += 1;
          continue;
        }
      }
      if (!(freeSpacing && head !== "[" && char.match(/\s/))) ;
      i += 1;
    }
  }
  if (backslashes.size)
    result.backslashes = backslashes;
  if (posixBrackets.size)
    result.posixBrackets = posixBrackets;
  if (groupModifiers.size)
    result.groupModifiers = groupModifiers;
  if (possessiveQuantifiers.size)
    result.possessiveQuantifiers = possessiveQuantifiers;
  if (flagModifiers.size)
    result.flagModifiers = flagModifiers;
  return result;
}
function structuralFeaturesToFlat(features, set = /* @__PURE__ */ new Set()) {
  for (const s of features.backslashes || [])
    set.add(`\\${s}`);
  for (const g of features.groupModifiers || [])
    set.add(`(?${g}`);
  for (const f of features.flagModifiers || [])
    set.add(f);
  for (const m of features.posixBrackets || [])
    set.add(`[:${m}:]`);
  for (const p of features.possessiveQuantifiers || [])
    set.add(`${p}+`);
  return set;
}

export { FEATURES_POLYFILLABLE, FEATURES_SUPPORTED_BY_JS, detectRegexFeatures, detectRegexFeaturesStrcutural, structuralFeaturesToFlat };
