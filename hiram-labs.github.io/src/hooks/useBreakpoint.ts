import { maxBy } from 'lodash';

// const viewport = useBreakPoint()
// this is a hook which listens to viewport changes and returns true for screens less than
// 768px and false for screens greater than 768px
// it also returns the value of the viewport in number and boostrap standards after every adjustment

import { useState, useEffect } from 'react';

// helper function to translate the size to string of xs sm md lg
const helperStandard = (arg: number) => {
  const breakpoint = [
    { xl: '1279' },
    { lg: '1023' },
    { md: '767' },
    { md: '639' },
    { sm: '0' }
  ];
  let value = maxBy(
    breakpoint.filter((e) => +Object.values(e)[0]! < arg),
    (o) => o
  );
  return Object.keys(value!)[0] as 'sm' | 'md' | 'lg' | 'xl';
};

// Hook to monitor viewport size
export function useBreakpoint() {
  //constant update of viewport size
  const [viewPortSize, setviewPortSize] = useState<number>(window.innerWidth);

  //define viewport size as sm md lg xl
  const [viewPortSizeStandard, setviewPortSizeStandard] = useState<
    'sm' | 'md' | 'lg' | 'xl'
  >(helperStandard(window.innerWidth));

  // event listner function
  const handleResize = () => {
    setviewPortSizeStandard(helperStandard(document.body.offsetWidth));
    setviewPortSize(document.body.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screen: viewPortSizeStandard, unit: viewPortSize };
}
