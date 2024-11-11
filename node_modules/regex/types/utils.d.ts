/**
@param {string} expression
@param {number} precedingCaptures
@returns {string}
*/
export function adjustNumberedBackrefs(expression: string, precedingCaptures: number): string;
export function containsCharClassUnion(charClassPattern: any): boolean;
/**
@param {string} expression
@returns {number}
*/
export function countCaptures(expression: string): number;
/**
Escape special characters for the given context, assuming flag v.
@param {string} str String to escape
@param {'DEFAULT' | 'CHAR_CLASS'} context `Context` option from lib `regex-utilities`
@returns {string} Escaped string
*/
export function escapeV(str: string, context: "DEFAULT" | "CHAR_CLASS"): string;
export function getBreakoutChar(expression: any, regexContext: any, charClassContext: any): any;
/**
@typedef {{
  regexContext: string;
  charClassContext: string;
  charClassDepth: number;
  lastPos: number;
}} RunningContext
*/
/**
Accepts and returns its full state so it doesn't have to reprocess parts that have already been
seen. Assumes flag v and doesn't worry about syntax errors that are caught by it.
@param {string} incompleteExpression
@param {Partial<RunningContext>} [runningContext]
@returns {RunningContext}
*/
export function getEndContextForIncompleteExpression(incompleteExpression: string, { regexContext, charClassContext, charClassDepth, lastPos, }?: Partial<RunningContext>): RunningContext;
/**
@typedef {import('./regex.js').InterpolatedValue} InterpolatedValue
@typedef {import('./regex.js').RawTemplate} RawTemplate
@typedef {import('./regex.js').RegexTagOptions} RegexTagOptions
@typedef {(
  value: InterpolatedValue,
  runningContext: RunningContext,
  options: Required<RegexTagOptions>
) => {
  transformed: string;
  runningContext: RunningContext;
}} Preprocessor
*/
/**
Returns transformed versions of a template and substitutions, using the given preprocessor. Only
processes substitutions that are instanceof `Pattern`.
@param {RawTemplate} template
@param {ReadonlyArray<InterpolatedValue>} substitutions
@param {Preprocessor} preprocessor
@param {Required<RegexTagOptions>} options
@returns {{template: RawTemplate; substitutions: ReadonlyArray<InterpolatedValue>;}}
*/
export function preprocess(template: RawTemplate, substitutions: ReadonlyArray<InterpolatedValue>, preprocessor: Preprocessor, options: Required<RegexTagOptions>): {
    template: RawTemplate;
    substitutions: ReadonlyArray<InterpolatedValue>;
};
export function sandboxLoneCharClassCaret(str: any): any;
export function sandboxLoneDoublePunctuatorChar(str: any): any;
/**
Converts `\0` tokens to `\x00` in the given context.
@param {string} str
@param {'DEFAULT' | 'CHAR_CLASS'} [context] `Context` option from lib `regex-utilities`
@returns {string}
*/
export function sandboxUnsafeNulls(str: string, context?: "DEFAULT" | "CHAR_CLASS"): string;
/**
@param {string} str
@param {number} pos
@param {string} oldValue
@param {string} newValue
@returns {string}
*/
export function spliceStr(str: string, pos: number, oldValue: string, newValue: string): string;
export namespace RegexContext {
    let DEFAULT: string;
    let CHAR_CLASS: string;
    let ENCLOSED_P: string;
    let ENCLOSED_U: string;
    let GROUP_NAME: string;
    let INTERVAL_QUANTIFIER: string;
    let INVALID_INCOMPLETE_TOKEN: string;
}
export namespace CharClassContext {
    let DEFAULT_1: string;
    export { DEFAULT_1 as DEFAULT };
    let ENCLOSED_P_1: string;
    export { ENCLOSED_P_1 as ENCLOSED_P };
    export let ENCLOSED_Q: string;
    let ENCLOSED_U_1: string;
    export { ENCLOSED_U_1 as ENCLOSED_U };
    let INVALID_INCOMPLETE_TOKEN_1: string;
    export { INVALID_INCOMPLETE_TOKEN_1 as INVALID_INCOMPLETE_TOKEN };
    export let RANGE: string;
}
export const enclosedTokenRegexContexts: any;
export const enclosedTokenCharClassContexts: any;
export const patternModsSupported: boolean;
export const flagVSupported: boolean;
export const emulationGroupMarker: "$E$";
export const doublePunctuatorChars: "&!#$%*+,.:;<=>?@^`~";
export const namedCapturingDelim: any;
export const capturingDelim: any;
export const noncapturingDelim: any;
export type RunningContext = {
    regexContext: string;
    charClassContext: string;
    charClassDepth: number;
    lastPos: number;
};
export type InterpolatedValue = import("./regex.js").InterpolatedValue;
export type RawTemplate = import("./regex.js").RawTemplate;
export type RegexTagOptions = import("./regex.js").RegexTagOptions;
export type Preprocessor = (value: InterpolatedValue, runningContext: RunningContext, options: Required<RegexTagOptions>) => {
    transformed: string;
    runningContext: RunningContext;
};
