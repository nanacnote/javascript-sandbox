module.exports = {
  /**
   * update the url with new hash pointer and scroll to view
   * @param {string} htmlID
   */
  handleSectionHashTracking(htmlID) {
    window.history.pushState({}, "", `#${htmlID}`);
    document.getElementById(htmlID).scrollIntoView({
      behavior: "smooth",
    });
  },
};
