/**
 * Parameters type declarations
 * @internal
 */
export declare type TParams = {
    category: "HOSPITALS" | "UNIVERSITIES";
};
export declare class Directory {
    private _options;
    private _news;
    newsToday: string[] | undefined;
    newsWeek: string[] | undefined;
    newsMonth: string[] | undefined;
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
    constructor(options: TParams, another?: any);
    /**
     * gets number of selected category item in a region
     * @public
     * @method
     * @returns number
     */
    numberIn(param: "ENGLAND" | "WALES" | "SCOTLAND" | "NORTHEN IRELAND"): 100 | 35 | 75 | 50 | 98 | 10 | 43 | 27 | undefined;
}
