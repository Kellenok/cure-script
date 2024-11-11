'use strict';

const lowering = require('./shared/oniguruma-to-js.292c62e4.cjs');
require('regex');

function loweringTextmateGrammar(grammar, options = {}) {
  const clone = structuredClone(grammar);
  const {
    handlePattern = (pattern) => lowering.syntaxLowering(pattern, { preserveFlags: true }).pattern
  } = options;
  function handle(regex) {
    return handlePattern(regex, clone);
  }
  function traverse(a) {
    if (Array.isArray(a)) {
      a.forEach((j) => {
        traverse(j);
      });
      return;
    }
    if (!a || typeof a !== "object")
      return;
    if (a.foldingStartMarker) {
      a.foldingStartMarker = handle(a.foldingStartMarker);
    }
    if (a.foldingStopMarker) {
      a.foldingStopMarker = handle(a.foldingStopMarker);
    }
    if (a.firstLineMatch) {
      a.firstLineMatch = handle(a.firstLineMatch);
    }
    if (a.match)
      a.match = handle(a.match);
    if (a.begin)
      a.begin = handle(a.begin);
    if (a.end)
      a.end = handle(a.end);
    if (a.while)
      a.while = handle(a.while);
    if (a.patterns) {
      traverse(a.patterns);
    }
    if (a.captures) {
      traverse(Object.values(a.captures));
    }
    if (a.beginCaptures) {
      traverse(Object.values(a.beginCaptures));
    }
    if (a.endCaptures) {
      traverse(Object.values(a.endCaptures));
    }
    Object.values(a.repository || {}).forEach((j) => {
      traverse(j);
    });
  }
  traverse(clone);
  return clone;
}

exports.loweringTextmateGrammar = loweringTextmateGrammar;
