const hbs = require("handlebars");
const hljs = require("highlight.js");
const _ = require("lodash");
const fs = require("fs");

/**
 * Common JS module to help build html dynamic html files from templates
 * This module must be maintain as commonjs because its use in nodejs
 * by the grunt-run task
 *
 * @param {string} __filename
 * @param {string} source
 * @param {object} context
 */
function templateBuilder(__filename, source, context) {
  // registers a helper on handlebar to append a comma after each item
  // does not append a comma if item is the last in the list
  hbs.registerHelper("eachComma", function (context, options) {
    let ret = "";
    for (let i = 0; i < context.length; i++) {
      if (i === context.length - 1) {
        ret = ret + options.fn(context[i]);
      } else {
        ret = ret + options.fn(context[i]) + ", ";
      }
    }
    return ret;
  });

  // registers a helper on handlebar to append a straightSlash after each item
  // does not append a straightSlash if item is the last in the list
  hbs.registerHelper("eachStraightSlash", function (context, options) {
    let ret = "";
    for (let i = 0; i < context.length; i++) {
      if (i === context.length - 1) {
        ret = ret + options.fn(context[i]);
      } else {
        ret = ret + options.fn(context[i]) + "| ";
      }
    }
    return ret;
  });

  // registers a helper on handlebar to use highlight js to format code blocks
  hbs.registerHelper("highlight", function (context, options) {
    let ret;
    context.forEach((e) => {
      if (e.tag === "example" || e.tag === "examples") {
        ret = "<pre>" + options.fn(hljs.highlightAuto(e.text).value) + "</pre>";
      }
    });
    return ret;
  });

  // registers a helper on handlebar to map extract comments from typedoc context
  hbs.registerHelper("commentText", function (context, options) {
    let ret;
    if (context.text) {
      ret = options.fn(context.text);
    }
    if (context.shortText) {
      ret = options.fn(context.shortText);
    }
    return ret;
  });

  // registers a helper on handlebar to cast camel case to kebab case
  hbs.registerHelper("camel2Kebab", function (options) {
    return _.kebabCase(options.fn(this));
  });

  const template = hbs.compile(source);
  const html = template(context);

  fs.writeFile(
    __filename.slice(0, __filename.indexOf(".")) + ".html",
    html,
    (err) => {
      if (err) throw err;
    }
  );
}
module.exports = templateBuilder;
