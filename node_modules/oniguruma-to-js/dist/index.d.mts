interface ConstructOptions {
    /**
     * Original pattern, for error reporting.
     */
    original?: string;
    /**
     * Default flags to use. (default: `dg`)
     *
     * Note that some Oniguruma patterns might alter the flags.
     */
    flags?: string | string[];
    /**
     * Ignore contiguous anchors (\G) in the pattern.
     *
     * There is no equivalent in JavaScript
     *
     * @default false
     */
    ignoreContiguousAnchors?: boolean;
}
/**
 * Construct a RegExp object from a already-lowered pattern.
 */
declare function construct(pattern: string, options?: ConstructOptions): RegExp;

interface SyntaxLoweringOptions {
    /**
     * Use the `regex` package lower the syntaxes, like Atomic Group, Possessive Quantifiers, etc.
     *
     * @default false
     */
    useRegex?: boolean;
    /**
     * Preserve flags like `x` in `(?i)` or `(?i:...)`.
     *
     * When set to `true`, meaning the result might not be directly usable in JavaScript.
     *
     * @default false
     */
    preserveFlags?: boolean;
    /**
     * Remove possessive quantifiers like `*+`, `?+`, `++`, `{1,2}+`.
     *
     * This might alter the meaning of the regex.
     *
     * You might not need this when `useRegex` is enabled.
     *
     * @default false
     */
    removePossessiveQuantifier?: boolean;
    /**
     * Remove atomic group like `(?>...)` to non-capturing group `(?:...)`.
     *
     * This might alter the meaning of the regex.
     *
     * You might not need this when `useRegex` is enabled.
     *
     * @default false
     */
    removeAtomicGroup?: boolean;
    /**
     * Convert `\h` and `\H` to `[0-9A-Fa-f]` and `[^0-9A-Fa-f]` respectively.
     *
     * @default false
     */
    convertHexDigitsShorthand?: boolean;
    /**
     * Convert `\p{...}` to `[...]` that are not supported in JavaScript.
     *
     * @default false
     */
    convertUnicodeCategory?: boolean;
    /**
     * Expand nested character class like `[a-z[0-9]]` to `[a-z0-9]`.
     *
     * @default false
     */
    expandNestedCharacterClass?: boolean;
}
interface SyntaxLoweringResult {
    pattern: string;
    flags: string;
}
/**
 * Read the Oniguruma regex, lower syntaxes and return a more JavaScript-friendly regex.
 */
declare function syntaxLowering(input: string, options?: SyntaxLoweringOptions): SyntaxLoweringResult;

interface OnigurumaToRegexpOptions extends Omit<ConstructOptions, 'original'>, SyntaxLoweringOptions {
}
declare function onigurumaToRegexp(pattern: string, options?: OnigurumaToRegexpOptions): RegExp;

declare class RegExpConversionError extends SyntaxError {
    patternOriginal: string;
    patternConverted?: string;
    cursorPosition?: number;
    constructor(message: string, options: {
        pattern: string;
        converted?: string;
        cursor?: number;
        cause?: unknown;
    });
}

export { type ConstructOptions, type OnigurumaToRegexpOptions, RegExpConversionError, type SyntaxLoweringOptions, type SyntaxLoweringResult, construct, onigurumaToRegexp, syntaxLowering };
