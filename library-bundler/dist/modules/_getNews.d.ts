/**
 *  Parameters type declarations
 *
 *  @internal
 */
export declare type TNews = {
    newsToday: string[];
    newsWeek: string[];
    newsMonth: string[];
} | undefined;
/**
 * Function to get new items
 *
 * @param institution A union type of either "HOSPITALS" or "UNIVERSITIES"
 * @returns object
 */
export declare function _getNews(institution: "HOSPITALS" | "UNIVERSITIES"): {
    newsToday: string[];
    newsWeek: string[];
    newsMonth: string[];
} | undefined;
/**
 * second function
 *
 * @param arg takes a string the quick brown fox jumps over the lazy dogs
 */
export declare const foo: (arg: string) => boolean;
