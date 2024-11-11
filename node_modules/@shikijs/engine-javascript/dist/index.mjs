import { onigurumaToRegexp } from 'oniguruma-to-js';

const replacements = [
  [
    "(?<square>[^\\[\\]\\\\]|\\\\.|\\[\\g<square>*+\\])",
    "(?<square>[^\\[\\]\\\\]|\\\\.|\\[(?:[^\\[\\]\\\\]|\\\\.|\\[(?:[^\\[\\]\\\\]|\\\\.|\\[(?:[^\\[\\]\\\\])*+\\])*+\\])*+\\])"
  ],
  [
    "(?<url>(?>[^\\s()]+)|\\(\\g<url>*\\))",
    "(?<url>(?>[^\\s()]+)|\\((?:(?>[^\\s()]+)|\\((?:(?>[^\\s()]+)|\\((?>[^\\s()]+)*\\))*\\))*\\))"
  ]
];

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MAX = 4294967295;
function defaultJavaScriptRegexConstructor(pattern) {
  return onigurumaToRegexp(
    pattern,
    {
      flags: "dgm",
      ignoreContiguousAnchors: true
    }
  );
}
class JavaScriptScanner {
  constructor(patterns, options = {}) {
    this.patterns = patterns;
    this.options = options;
    __publicField(this, "regexps");
    __publicField(this, "contiguousAnchorSimulation");
    const {
      forgiving = false,
      cache,
      simulation = true,
      regexConstructor = defaultJavaScriptRegexConstructor
    } = options;
    this.contiguousAnchorSimulation = Array.from({ length: patterns.length }, () => false);
    this.regexps = patterns.map((p, idx) => {
      if (simulation)
        p = p.replaceAll("(^|\\\uFFFF)", "(^|\\G)");
      if (simulation && (p.startsWith("(^|\\G)") || p.startsWith("(\\G|^)")))
        this.contiguousAnchorSimulation[idx] = true;
      const cached = cache?.get(p);
      if (cached) {
        if (cached instanceof RegExp) {
          return cached;
        }
        if (forgiving)
          return null;
        throw cached;
      }
      try {
        let pattern = p;
        if (simulation) {
          for (const [from, to] of replacements) {
            pattern = pattern.replaceAll(from, to);
          }
        }
        const regex = regexConstructor(pattern);
        cache?.set(p, regex);
        return regex;
      } catch (e) {
        cache?.set(p, e);
        if (forgiving)
          return null;
        throw e;
      }
    });
  }
  findNextMatchSync(string, startPosition) {
    const str = typeof string === "string" ? string : string.content;
    const pending = [];
    function toResult(index, match, offset = 0) {
      return {
        index,
        captureIndices: match.indices.map((indice) => {
          if (indice == null) {
            return {
              end: MAX,
              start: MAX,
              length: 0
            };
          }
          return {
            start: indice[0] + offset,
            length: indice[1] - indice[0],
            end: indice[1] + offset
          };
        })
      };
    }
    for (let i = 0; i < this.regexps.length; i++) {
      const regexp = this.regexps[i];
      if (!regexp)
        continue;
      try {
        let offset = 0;
        regexp.lastIndex = startPosition;
        let match = regexp.exec(str);
        if (!match && this.contiguousAnchorSimulation[i]) {
          offset = startPosition;
          regexp.lastIndex = 0;
          match = regexp.exec(str.slice(startPosition));
        }
        if (!match)
          continue;
        if (match.index === startPosition) {
          return toResult(i, match, offset);
        }
        pending.push([i, match, offset]);
      } catch (e) {
        if (this.options.forgiving)
          continue;
        throw e;
      }
    }
    if (pending.length) {
      const minIndex = Math.min(...pending.map((m) => m[1].index));
      for (const [i, match, offset] of pending) {
        if (match.index === minIndex) {
          return toResult(i, match, offset);
        }
      }
    }
    return null;
  }
}
function createJavaScriptRegexEngine(options = {}) {
  const _options = {
    cache: /* @__PURE__ */ new Map(),
    ...options
  };
  return {
    createScanner(patterns) {
      return new JavaScriptScanner(patterns, _options);
    },
    createString(s) {
      return {
        content: s
      };
    }
  };
}

export { JavaScriptScanner, createJavaScriptRegexEngine, defaultJavaScriptRegexConstructor };
