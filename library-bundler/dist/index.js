/**
 * create-package-app
 * v1.0.0
 * CC0-1.0
 * by Owusu K
 * contributors 
 * Typescript ready scaffolding for writing and publishing libraries. It comes packaged with an automated & customizable documentation website generator. This allows you to focus on writing code just for your library instead of doing all the other setup stuff.
 * https://github.com/nanacnote/create-package-app#readme
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Function to get new items
 *
 * @param institution A union type of either "HOSPITALS" or "UNIVERSITIES"
 * @returns object
 */
function _getNews(institution) {
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
    }
}

var Directory = /** @class */ (function () {
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
    function Directory(options, another) {
        var _a, _b, _c;
        this._options = options;
        this._news = _getNews(this._options.category);
        this.newsToday = (_a = this._news) === null || _a === void 0 ? void 0 : _a.newsToday;
        this.newsWeek = (_b = this._news) === null || _b === void 0 ? void 0 : _b.newsWeek;
        this.newsMonth = (_c = this._news) === null || _c === void 0 ? void 0 : _c.newsMonth;
    }
    /**
     * gets number of selected category item in a region
     * @public
     * @method
     * @returns number
     */
    Directory.prototype.numberIn = function (param) {
        var _a, _b;
        if (((_a = this._options) === null || _a === void 0 ? void 0 : _a.category) === "HOSPITALS") {
            switch (param) {
                case "ENGLAND":
                    return 100;
                case "WALES":
                    return 35;
                case "SCOTLAND":
                    return 75;
                case "NORTHEN IRELAND":
                    return 50;
            }
        }
        if (((_b = this._options) === null || _b === void 0 ? void 0 : _b.category) === "UNIVERSITIES") {
            switch (param) {
                case "ENGLAND":
                    return 98;
                case "WALES":
                    return 10;
                case "SCOTLAND":
                    return 43;
                case "NORTHEN IRELAND":
                    return 27;
            }
        }
    };
    return Directory;
}());

var hospitals = new Directory({ category: "HOSPITALS" });
var universities = new Directory({ category: "UNIVERSITIES" });

exports.hospitals = hospitals;
exports.universities = universities;
