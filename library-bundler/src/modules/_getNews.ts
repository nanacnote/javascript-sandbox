/**
 *  Parameters type declarations
 *
 *  @internal
 */
export type TNews =
  | {
      newsToday: string[];
      newsWeek: string[];
      newsMonth: string[];
    }
  | undefined;

/**
 * Function to get new items
 *
 * @param institution A union type of either "HOSPITALS" or "UNIVERSITIES"
 * @returns object
 */
export function _getNews(institution: "HOSPITALS" | "UNIVERSITIES") {
  switch (institution) {
    case "HOSPITALS":
      return {
        newsToday: ["hospitals news item 1", "hospitals news item 2"],
        newsWeek: ["hospitals news item 1", "hospitals news item 2"],
        newsMonth: ["hospitals news item 1", "hospitals news item 2"],
      };
    case "UNIVERSITIES":
      return {
        newsToday: ["university news item 1", "university news item 2"],
        newsWeek: ["university news item 1", "university news item 2"],
        newsMonth: ["university news item 1", "university news item 2"],
      };
    default:
      break;
  }
}

/**
 * second function
 *
 * @param arg takes a string the quick brown fox jumps over the lazy dogs
 */
export const foo = (arg: string) => {
  arg + " end";
  return true;
};
