import { PatternScanner, RegexEngineString, RegexEngine } from '@shikijs/types';
import { IOnigMatch } from '@shikijs/vscode-textmate';

interface JavaScriptRegexEngineOptions {
    /**
     * Whether to allow invalid regex patterns.
     *
     * @default false
     */
    forgiving?: boolean;
    /**
     * Use JavaScript to simulate some unsupported regex features.
     *
     * @default true
     */
    simulation?: boolean;
    /**
     * Cache for regex patterns.
     */
    cache?: Map<string, RegExp | Error> | null;
    /**
     * Custom pattern to RegExp constructor.
     *
     * By default `oniguruma-to-js` is used.
     */
    regexConstructor?: (pattern: string) => RegExp;
}
/**
 * The default RegExp constructor for JavaScript regex engine.
 */
declare function defaultJavaScriptRegexConstructor(pattern: string): RegExp;
declare class JavaScriptScanner implements PatternScanner {
    patterns: string[];
    options: JavaScriptRegexEngineOptions;
    regexps: (RegExp | null)[];
    contiguousAnchorSimulation: boolean[];
    constructor(patterns: string[], options?: JavaScriptRegexEngineOptions);
    findNextMatchSync(string: string | RegexEngineString, startPosition: number): IOnigMatch | null;
}
/**
 * Use the modern JavaScript RegExp engine to implement the OnigScanner.
 *
 * As Oniguruma regex is more powerful than JavaScript regex, some patterns may not be supported.
 * Errors will be thrown when parsing TextMate grammars with unsupported patterns.
 * Set `forgiving` to `true` to ignore these errors and skip the unsupported patterns.
 *
 * @experimental
 */
declare function createJavaScriptRegexEngine(options?: JavaScriptRegexEngineOptions): RegexEngine;

export { type JavaScriptRegexEngineOptions, JavaScriptScanner, createJavaScriptRegexEngine, defaultJavaScriptRegexConstructor };
