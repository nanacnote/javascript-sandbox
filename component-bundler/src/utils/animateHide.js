module.exports = class AnimateHide {
  _userDefinedShowAnimation;
  _userDefinedHideAnimation;
  constructor() {
    this._identifier = `animated-hide-${this._genUnique()}`;
    this._userDefinedShowAnimation = null;
    this._userDefinedHideAnimation = null;
  }

  _genUnique() {
    return `${parseInt(Math.pow(2, 32) * Math.random(), 10).toString(
      16
    )}-${Date.now().toString(16)}`;
  }

  _removeFromDom() {
    if (typeof document !== 'undefined') {
      const element = document.querySelector(`.${this._identifier}`);
      if (element) {
        element.classList.add('custom-hiram-labs-SB-animate-remove');
        element.classList.remove(
          this._userDefinedShowAnimation || 'custom-hiram-labs-SB-animate-show'
        );
      }
    }
  }

  hide(hideAnimationClassName = null) {
    this._userDefinedHideAnimation = hideAnimationClassName;
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        this._removeFromDom();
      }, 400);
      return `${this._identifier} ${
        this._userDefinedHideAnimation || 'custom-hiram-labs-SB-animate-hide'
      }`;
    }
    return null;
  }

  show(showAnimationClassName = null) {
    this._userDefinedShowAnimation = showAnimationClassName;
    if (typeof document !== 'undefined') {
      const element = document.querySelector(`.${this._identifier}`);
      if (element) {
        element.classList.add(
          this._userDefinedShowAnimation || 'custom-hiram-labs-SB-animate-show'
        );
        element.classList.remove('custom-hiram-labs-SB-animate-remove');
        element.classList.remove(
          this._userDefinedHideAnimation || 'custom-hiram-labs-SB-animate-hide'
        );
        element.classList.remove(this._identifier);
      }
      return (
        this._userDefinedShowAnimation || 'custom-hiram-labs-SB-animate-show'
      );
    }
    return null;
  }
};
