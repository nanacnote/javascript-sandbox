import { debounce } from 'lodash';

/**
 * @author
 * Owusu K
 *
 * @dependency
 * `lodash/debounce`
 *
 * An instance of this class exposes methods for scrolling on the x-axis.
 *
 * ---
 *
 * @param object - parent value is require (ie the element to apply scroll on)
 *
 * ---
 *
 * @method prev - scrolls left
 * @method next - scrolls right
 * @method focus - the child element to bring in view
 */
export class ScrollSnapX {
  constructor({ parent, focusByIndex, focusDelay }) {
    this.parent = parent;
    this.focusByIndex = focusByIndex;
    this.focusDelay = focusDelay || 2500;

    this.scrollByWidth = 0;

    this.scrollPosition = {
      current: 0,
      atStart: false,
      atEnd: false,
      parentStartPosition: 0,
      parentEndPosition: 0,
    };

    this.parent.addEventListener(
      'scroll',
      debounce(() => this.update.call(this), 250),
    );
  }

  prev() {
    if (this.scrollPosition.atStart) return;

    const updatedPosition = this.scrollPosition.current - this.scrollByWidth;

    this.scrollPosition.current = updatedPosition;
    this.parent?.scrollTo({
      left: this.scrollPosition.current,
      behavior: 'smooth',
    });
  }

  next() {
    if (this.scrollPosition.atEnd) return;

    const updatedPosition = this.scrollPosition.current + this.scrollByWidth;

    this.scrollPosition.current = updatedPosition;
    this.parent.scrollTo({
      left: this.scrollPosition.current,
      behavior: 'smooth',
    });
  }

  update() {
    const childrenArray = this.parent?.childNodes;
    const childrenWidthArray = [];

    this.scrollPosition.atStart = false;
    this.scrollPosition.atEnd = false;

    if (childrenArray) {
      this.scrollPosition.parentStartPosition = this.parent?.getBoundingClientRect().left;
      this.scrollPosition.parentEndPosition = this.parent?.getBoundingClientRect().right;

      childrenArray.forEach((child) => {
        childrenWidthArray.push(child?.offsetWidth);

        if (
          child === childrenArray[0] &&
          child.getBoundingClientRect().left >= this.scrollPosition.parentStartPosition
        ) {
          this.scrollPosition.atStart = true;
        }

        if (
          child === childrenArray[childrenArray.length - 1] &&
          child.getBoundingClientRect().right <= this.scrollPosition.parentEndPosition + 5
        ) {
          this.scrollPosition.atEnd = true;
        }
      });

      this.scrollByWidth = Math.max(...childrenWidthArray);
    }
  }

  /**
   * Brings a child element into view
   * The param can also be set directly on the
   * ``focusByIndex`` property of the instance
   *
   * @param {number} focusByIndex
   */
  focus(focusByIndex) {
    if (focusByIndex) {
      this.focusByIndex = focusByIndex;
    }

    const childrenArray = this.parent?.childNodes;
    const childrenWidthArray = [];

    childrenArray.forEach((child, index) => {
      childrenWidthArray.push(child?.offsetWidth);

      if (
        index === this.focusByIndex &&
        (child.getBoundingClientRect().left < this.scrollPosition.parentStartPosition ||
          child.getBoundingClientRect().right > this.scrollPosition.parentEndPosition)
      ) {
        const scrollToPoint = childrenWidthArray.reduce((acc, cur, idx, arr) =>
          idx === arr.length - 1 ? acc + 0 : acc + cur,
        );

        this.scrollPosition.current = index === 0 ? 0 : scrollToPoint;

        this.parent.scrollTo({
          left: this.scrollPosition.current,
          behavior: 'smooth',
        });
      }
    });
  }
}
