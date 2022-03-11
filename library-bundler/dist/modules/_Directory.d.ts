/**
 *  Parameters type declarations
 *  @internal
 */
export declare type TParams = {
    options: {
        category: "HOSPITALS" | "UNIVERSITIES";
    };
};
export declare class _Directory {
    private _options;
    private _news;
    newsToday: string[] | undefined;
    newsWeek: string[] | undefined;
    newsMonth: string[] | undefined;
    /**
     * Main class object for findOut library
     * @class
     * @param options determines how to interact with the API
     */
    constructor(options: TParams["options"]);
    /**
     * gets number of selected category item in a region
     * @public
     * @method
     * @returns number
     */
    numberIn(param: "ENGLAND" | "WALES" | "SCOTLAND" | "NORTHEN IRELAND"): 100 | 35 | 75 | 50 | 98 | 10 | 43 | 27 | undefined;
}
