import * as pkg from "../../package.json";

const _ = require("lodash");
const utils = require("./utils.lock");

/**
 * Base function required to handle and direct user interations on the website
 * - It controls reponsive behaviour
 * - It loads clickable links on the left sider panel for how to use the library
 * - It allow for customising of extra user interaction on the stage component
 *   by exposing stageBtnClickHandler() function.
 *
 * @param {string} ROOT_URL
 */
export const main = (ROOT_URL) => {
  // inject data from package.json
  $(".library-name").text(pkg.name);
  $(".library-author").text(pkg.author);
  $(".library-license").text(pkg.license);
  $(".library-contact").text(pkg.email);

  // inject sider links from handlebars build
  $("#general-links").load("content/siderLinks/generalLinks.html");
  $("#documentation-links").load("content/siderLinks/documentationLinks.html");

  // inject getting started content, edit this page link and left border for selected item on load as initial content
  $("#stage-content").load(
    "content/siderContents/customGettingStartedContent.html",
    function () {
      $("#stage-edit-link>a").attr(
        "href",
        `${ROOT_URL}/${pkg.name}/tree/master/docs/content/siderLinks/customGettingStartedContent.html`
      );
      $('button[data-content-ref="customGettingStartedContent"]').addClass(
        "selected-left"
      );
    }
  );

  // capture only sider button clicks and inject content onto stage
  $("#sider-content").delegate(".btn-no-decoration", "click", function () {
    const btnCurrentRef = $(this).data("content-ref");
    const sectionID = _.kebabCase(btnCurrentRef);
    if (btnCurrentRef.split("-").length > 1) {
      // if sider item clicked is a prop method or class inject long list of
      // all prop method and class and jump to the clicked items section
      $("#stage-content").load(
        `content/siderContents/documentationContent.html`,
        function () {
          $("#stage-edit-link>a").attr(
            "href",
            `${ROOT_URL}/${pkg.name}/tree/master/docs/content/siderContents/documentationContent.html`
          );
          // adds selected left border styling
          $(".btn-no-decoration").removeClass("selected-left");
          $(`button[data-content-ref=${btnCurrentRef}]`).addClass(
            "selected-left"
          );
          utils.handleSectionHashTracking(sectionID);
        }
      );
    } else {
      // hydrate page with preferred content
      $("#stage-content").load(
        `content/siderContents/${btnCurrentRef}.html`,
        function () {
          $("#stage-edit-link>a").attr(
            "href",
            `${ROOT_URL}/${pkg.name}/tree/master/docs/content/siderContents/${btnCurrentRef}.html`
          );
          // adds selected left border styling
          $(".btn-no-decoration").removeClass("selected-left");
          $(`button[data-content-ref=${btnCurrentRef}]`).addClass(
            "selected-left"
          );
          utils.handleSectionHashTracking(sectionID);
        }
      );
    }
  });

  // responsive navbar handler
  $("#navbar-xs-button").on("click", function () {
    if ($("#navbar-xs-drawer").hasClass("d-none")) {
      $("#navbar-xs-drawer").removeClass("d-none");
    } else {
      $("#navbar-xs-drawer").addClass("d-none");
    }
    // clone sidebar into popup menu
    const siderContent = $("#sider-content").clone(true);
    $("#insert-sider-content").empty().append(siderContent);
  });
};
