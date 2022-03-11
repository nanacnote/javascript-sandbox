import React from 'react';

import typography from '@shared/typography';

import BlackLink from './style/BlackLink';
import BlueLink from './style/BlueLink';
import GrayLink from './style/GrayLink';
import Gradient from './style/Gradient';

export interface LinkProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Determines the flavour of link
   */
  variant?: 'black' | 'blue' | 'gray' | 'gradient';
  /**
   * Sets the styling of the font
   * Refer to Typography page for more.
   */
  fontStyle?: keyof typeof typography['preset'];
  /**
   * State of the link
   */
  disabled?: boolean;
  /**
   * Sets the display label
   */
  label?: string;
}

/**
 * Anchor link component with different variants
 */
const LinkComponent = (
  {
    className,
    variant = 'black',
    label,
    fontStyle,
    disabled = false,
    ...props
  }: LinkProps,
  ref
) => {
  const L: {[key in LinkProps['variant']]} = {
    black: BlackLink,
    blue: BlueLink,
    gray: GrayLink,
    gradient: Gradient,
  };

  const LinkVariant = L[variant];

  return (
    <LinkVariant
      ref={ref}
      className={className}
      fontStyle={fontStyle}
      disabled={disabled}
      {...props}
    >
      {label}
    </LinkVariant>
  );
};

export const Link = React.forwardRef(LinkComponent);
