import React from 'react';
import proxyEvent from '@utils/proxyEvent';
import {assertFnProp} from '@utils/domHelpers';

import Wrapper from './style/Wrapper';

export interface DivButtonProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Sets children component
   */
  children?: React.ReactNode;
  /**
   * onClick callback
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}

/**
 * A component to wrapper general dom interaction to allow for tracing events. Use to capture `onClick onBlur etc`.
 */
export const DivButton = ({
  className,
  children,
  onClick,
  ...props
}: DivButtonProps) => {
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      const extendedEvent = proxyEvent(event);
      assertFnProp(onClick) && onClick(extendedEvent);
    }
  };

  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onClick) && onClick(extendedEvent);
  };

  return (
    <Wrapper
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onClick={callback}
      onKeyPress={handleKeyPress}
      className={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
};
