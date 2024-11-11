interface TextmatePatternBasic {
    match?: string;
    begin?: string;
    end?: string;
    patterns?: TextmatePatternBasic[];
}
interface TextmateGrammarBasic {
    patterns?: TextmatePatternBasic[];
    repository?: Record<string, TextmatePatternBasic>;
}
interface LoweringTextmateGrammarOptions<T extends TextmateGrammarBasic> {
    handlePattern?: (pattern: string, clone: T) => string;
}
declare function loweringTextmateGrammar<T extends TextmateGrammarBasic>(grammar: T, options?: LoweringTextmateGrammarOptions<T>): T;

export { type LoweringTextmateGrammarOptions, type TextmateGrammarBasic, type TextmatePatternBasic, loweringTextmateGrammar };
