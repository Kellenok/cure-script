declare const FEATURES_SUPPORTED_BY_JS: string[];
declare const FEATURES_POLYFILLABLE: string[];
interface RegExpFeaturesStructured {
    backslashes?: Set<string>;
    posixBrackets?: Set<string>;
    groupModifiers?: Set<string>;
    possessiveQuantifiers?: Set<string>;
    flagModifiers?: Set<string>;
}
/**
 * Groups are specified as `(?` `(?<=` etc without closing bracket.
 * Flags are specified as `x` `i` etc
 * POSIX classes are specified as `[:alnum:]` etc
 * Possessive quantifiers are specified as `*+` etc
 */
type RegExpFeaturesFlat = Set<string>;
interface DetectRegexFeaturesOptions<S extends boolean = false> {
    /**
     * Should the function return structural result, or a flag list of strings
     *
     * @default false
     */
    structural?: S;
    /**
     * Features set to reuse, useful if you want to pass previous features set result.
     *
     * Only work with `structural: false`
     */
    featuresSet?: RegExpFeaturesFlat;
}
/**
 * Detect features used from regex patterns.
 * Useful to check if a regex is supported for a specific engine.
 */
declare function detectRegexFeatures<S extends true>(input: string | string[], options: DetectRegexFeaturesOptions<S>): RegExpFeaturesStructured;
declare function detectRegexFeatures<S extends boolean = false>(input: string | string[], options?: DetectRegexFeaturesOptions<S>): RegExpFeaturesFlat;
declare function detectRegexFeaturesStrcutural(patterns: string | string[]): RegExpFeaturesStructured;
declare function structuralFeaturesToFlat(features: RegExpFeaturesStructured, set?: Set<string>): RegExpFeaturesFlat;

export { type DetectRegexFeaturesOptions, FEATURES_POLYFILLABLE, FEATURES_SUPPORTED_BY_JS, type RegExpFeaturesFlat, type RegExpFeaturesStructured, detectRegexFeatures, detectRegexFeaturesStrcutural, structuralFeaturesToFlat };
