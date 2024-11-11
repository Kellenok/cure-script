'use strict';

const lowering = require('./shared/oniguruma-to-js.292c62e4.cjs');
require('regex');

function construct(pattern, options = {}) {
  const {
    original = pattern,
    flags = ["g"]
  } = options;
  if (pattern.startsWith("(?x)") || pattern.includes("(?x:")) {
    throw new lowering.RegExpConversionError(
      "RegExp Free-spacing mode `(?x)` is not supported, you might want to run syntaxLowering() first",
      { pattern: original, converted: pattern }
    );
  }
  if (pattern.match(/\[:\w+:\]/)) {
    throw new lowering.RegExpConversionError(
      "POSIX character classes are not supported, you might want to run syntaxLowering() first",
      { pattern: original, converted: pattern }
    );
  }
  const flagSet = new Set(Array.isArray(flags) ? flags : flags.split(""));
  if (pattern.includes("\\p{"))
    flagSet.add("u");
  pattern = pattern.replace(/\\A/g, "^").replace(/\\Z/g, "(?=\\n?$)").replace(/\\z/g, "$").replace(/\\x\{([^}]*)\}/g, (m, hex) => `\\u${hex.padStart(4, "0")}`).replace(/\(\?(-)?(\w+):/g, (_, neg, flagStr) => {
    if (neg) {
      for (const flag of flagStr)
        flagSet.delete(flag);
    } else {
      for (const flag of flagStr)
        flagSet.add(flag);
    }
    return "(?:";
  }).replace(/\(\?(-)?(\w+)\)/g, (_, neg, flags2) => {
    if (neg) {
      for (const flag of flags2)
        flagSet.delete(flag);
    } else {
      for (const flag of flags2)
        flagSet.add(flag);
    }
    return "";
  });
  if (options.ignoreContiguousAnchors) {
    if (pattern.includes("\\G")) {
      flagSet.add("y");
    }
    if (pattern.startsWith("\\G")) {
      pattern = pattern.slice(2);
    }
    pattern = pattern.replace(/\|\\G(\||\))/g, "$1").replace(/(\(|\|)\\G\|/g, "$1").replace(/\\G/g, "");
  }
  if (flagSet.has("x")) {
    throw new lowering.RegExpConversionError(
      "JavaScript does not support extended mode (x flag), you might want to run syntaxLowering() first",
      { pattern: original, converted: pattern }
    );
  }
  try {
    return new RegExp(pattern, [...flagSet].join(""));
  } catch (e) {
    throw new lowering.RegExpConversionError(
      `Failed to construct RegExp`,
      {
        pattern: original,
        converted: pattern,
        cause: e
      }
    );
  }
}

function onigurumaToRegexp(pattern, options = {}) {
  const {
    pattern: converted,
    flags
  } = lowering.syntaxLowering(pattern, {
    // removePossessiveQuantifier: false,
    // removeAtomicGroup: false,
    convertHexDigitsShorthand: true,
    convertUnicodeCategory: true,
    useRegex: true,
    expandNestedCharacterClass: true,
    ...options
  });
  return construct(converted, {
    original: pattern,
    ...options,
    flags: [.../* @__PURE__ */ new Set([...flags, ...options.flags || []])].join("")
  });
}

exports.RegExpConversionError = lowering.RegExpConversionError;
exports.syntaxLowering = lowering.syntaxLowering;
exports.construct = construct;
exports.onigurumaToRegexp = onigurumaToRegexp;
