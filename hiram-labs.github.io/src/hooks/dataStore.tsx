import React from 'react';
import { useScroll, useBreakpoint } from '.';

// typings declaration for context
type ContextProps = {
  scrollDirection?: (param: number) => 'UP' | 'DOWN';
  scrollUnit?: number;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  breakpointUnit?: number;
};

// Creates the context
export const AppContext = React.createContext<Partial<ContextProps>>({});

// JSX element to wrap app, making the data available app wide
const AppProvider: React.FC<ContextProps> = (props): JSX.Element => {
  return (
    <AppContext.Provider
      value={{
        scrollDirection: (e) => {
          return useScroll(e).direction!;
        },
        scrollUnit: useScroll().unit,
        breakpoint: useBreakpoint().screen,
        breakpointUnit: useBreakpoint().unit
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
