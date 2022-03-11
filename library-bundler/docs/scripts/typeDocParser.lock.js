const data = require("../content/data/typedoc.lock.json");

/**
 *
 * Common JS module to parse the typeDoc json extract to get required information
 * to display in html
 *
 * @returns {object} -object containing parsed extracts
 */
function typeDocParser() {
  // structure the data from the json file into classes, methods and properties
  const dataClasses = [];
  const dataFunctions = [];
  const dataMethods = [];
  const dataProperties = [];

  data.children.forEach((e) => {
    if (e.children) {
      e.children.forEach((e) => {
        if (e.kindString === "Class") {
          dataClasses.push(e);
          e.children.forEach((e) => {
            if (e.kindString === "Method") {
              dataMethods.push(e);
            }
            if (e.kindString === "Property") {
              dataProperties.push(e);
            }
          });
        }
        if (e.kindString === "Function") {
          dataFunctions.push(e);
        }
      });
    }
  });

  return {
    classes: dataClasses,
    methods: dataMethods,
    properties: dataProperties,
    functions: dataFunctions,
  };
}
module.exports = typeDocParser;
