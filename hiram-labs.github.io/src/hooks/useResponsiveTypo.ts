import { useEffect } from 'react';

/**
 * Controls font-size and line-height based on element width.
 *
 * @param element - the container whose childrens typography will act responsively to resize
 * @param size - max font size
 */
export function useResponsiveTypo(
  element: React.RefObject<HTMLDivElement>,
  size: number
) {
  const changes = async () => {
    const settings = {
      minimum: 500,
      maximum: 1200,
      minFont: 12,
      maxFont: size,
      fontRatio: 15
    };
    let el = element.current!;
    let elw = el.parentElement!.offsetWidth!;
    let width = elw;
    let fontBase = width / settings.fontRatio;
    let fontSize = fontBase;
    if (elw > settings.maximum) {
      width = settings.maximum;
    }
    if (elw < settings.minimum) {
      width = settings.minimum;
    }
    if (elw > settings.maximum) {
      width = settings.maximum;
    }
    if (fontBase > settings.maxFont) {
      fontSize = settings.maxFont;
    }
    if (fontBase < settings.minFont) {
      fontSize = settings.minFont;
    }

    el.style.fontSize = fontSize + 'px';
  };

  useEffect(() => {
    element && changes(); // run on load
    window.addEventListener('resize', changes);
    return () => {
      window.removeEventListener('resize', changes);
    };
  }, []);
}
