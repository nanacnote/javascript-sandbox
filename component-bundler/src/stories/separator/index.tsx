import React from 'react';

import Gradient from './style/Gradient';
import Gray from './style/Gray';

export interface SeparatorProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Sets the flavour of the separator
   */
  variant?: 'gradient' | 'gray';
}

/**
 * Primary UI component to separate rows
 */
export const Separator = ({
  className,
  variant = 'gray',
  ...props
}: SeparatorProps) => (
  <>
    {variant === 'gray' && <Gray className={className} {...props} />}
    {variant === 'gradient' && <Gradient className={className} {...props} />}
  </>
);
