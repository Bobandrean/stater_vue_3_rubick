declare type TDiacraticList = {
    [key: string]: string;
};
export declare const DIACRITICS: TDiacraticList;
/**
 * code points generated from toCodePoints();
 * removed 65339 to 65345
 */
export declare const code_points: number[][];
/**
 * Remove accents
 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
 *
 */
export declare const asciifold: (str: string) => string;
/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 *
 */
export declare const arrayToPattern: (chars: string[], glue?: string) => string;
/**
 * Get all possible combinations of substrings that add up to the given string
 * https://stackoverflow.com/questions/30169587/find-all-the-combination-of-substrings-that-add-up-to-the-given-string
 *
 */
export declare const allSubstrings: (input: string) => string[][];
/**
 * Generate a list of diacritics from the list of code points
 *
 */
export declare const generateDiacritics: () => TDiacraticList;
/**
 * Expand a regular expression pattern to include diacritics
 * 	eg /a/ becomes /aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑAⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ/
 *
 */
export declare const diacriticRegexPoints: (regex: string) => string;
export {};
