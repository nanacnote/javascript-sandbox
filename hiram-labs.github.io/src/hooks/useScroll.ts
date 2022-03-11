import { useEffect, useState } from 'react';

/**
 * Listens for scroll of document
 * @param threshold number at which point hook determines direction of scroll
 * @returns object with direction to indicate up or down relative to threshold params and
 * unit for value of amount of document scrolled y direction wise in pixels
 */
// Hook to determine what referenced object is in view
export function useScroll(threshold: number = 0) {
  // handles direction state
  const [direction, setdirection] = useState<'UP' | 'DOWN' | undefined>(
    undefined
  );
  // handles unit state
  const [unit, setunit] = useState<number>(0);

  let prev = 0;

  useEffect(() => {
    // eventlistner call back function to run logic and set state
    const scrollHandler = () => {
      // gets value from the body of the document or fallback to the entire document containing headers and scipts
      const cur = document.body.scrollTop || document.documentElement.scrollTop;
      if (prev < cur && cur > threshold) {
        setdirection('UP');
      }
      if (cur < threshold) {
        setdirection('DOWN');
      }
      setunit(cur);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return { direction: direction, unit: unit };
}
