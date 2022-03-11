import React from 'react';

import typography from '@shared/typography';

import Primary from './style/Primary';
import GradientPureCss from './style/GradientPureCss';
import colors from '@shared/colors';

export interface TextProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Sets a flavor to the text type
   */
  variant?: 'primary' | 'gradient';
  /**
   * Sets the styling of the font
   * Refer to Typography page for more.
   */
  fontStyle?: keyof typeof typography['preset'];
  /**
   * Sets the color of the font
   * All css color types are allowed eg. hex, rgb etc
   * Also color names from palette is allowed
   * Refer to Color palette page for more.
   */
  fontColor?: keyof typeof colors['hex'];
  /**
   * Sets the inner text content can be a string | div | span to allow for extra styling
   */
  data: string;
}

/**
 * Primary UI component for text
 */
export const Text = ({
  className,
  variant = 'primary',
  fontStyle,
  fontColor,
  data,
  ...props
}: TextProps) => {
  const T: {[key in TextProps['variant']]} = {
    primary: Primary,
    gradient: GradientPureCss,
  };

  const TextVariant = T[variant];
  return (
    <TextVariant
      className={className}
      dangerouslySetInnerHTML={{__html: data}}
      fontStyle={fontStyle}
      fontColor={fontColor}
      {...props}
    />
  );
};
