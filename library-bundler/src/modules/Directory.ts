import { TNews, _getNews } from "./_getNews";

/**
 * Parameters type declarations
 * @internal
 */
export type TParams = {
  category: "HOSPITALS" | "UNIVERSITIES";
};

export class Directory {
  private _options: TParams;
  private _news: TNews;
  public newsToday: string[] | undefined;
  public newsWeek: string[] | undefined;
  public newsMonth: string[] | undefined;

  /**
   * Main class object for findOut library
   *
   * @param options determines how to interact with the API
   * @param another just another parameter as a placeholder
   * @returns A new Directory object
   * @example
   *  const foo = new Directory({category: "HOSPITALS"}, 'placeholder')
   * // foo
   */
  constructor(options: TParams, another?: any) {
    this._options = options;
    this._news = _getNews(this._options.category);
    this.newsToday = this._news?.newsToday;
    this.newsWeek = this._news?.newsWeek;
    this.newsMonth = this._news?.newsMonth;
  }

  /**
   * gets number of selected category item in a region
   * @public
   * @method
   * @returns number
   */
  public numberIn(param: "ENGLAND" | "WALES" | "SCOTLAND" | "NORTHEN IRELAND") {
    if (this._options?.category === "HOSPITALS") {
      switch (param) {
        case "ENGLAND":
          return 100;
        case "WALES":
          return 35;
        case "SCOTLAND":
          return 75;
        case "NORTHEN IRELAND":
          return 50;
        default:
          break;
      }
    }
    if (this._options?.category === "UNIVERSITIES") {
      switch (param) {
        case "ENGLAND":
          return 98;
        case "WALES":
          return 10;
        case "SCOTLAND":
          return 43;
        case "NORTHEN IRELAND":
          return 27;
        default:
          break;
      }
    }
  }
}
