import React from 'react';
import {assertFnProp} from '@utils/domHelpers';
import proxyEvent from '@utils/proxyEvent';
import {Svg, SvgProps} from '@stories/svg';

import colors from '@shared/colors';

import ResetButton from './style/ResetButton';
import Bordered from './style/Bordered';
import NoBorder from './style/NoBorder';
import NoBackground from './style/NoBackground';
import BlackBackground from './style/BlackBackground';

export interface IconProps {
  /**
   * Sets a custom class to button element wrapping the component
   */
  className?: string;
  /**
   * Name of svg image
   */
  name: SvgProps['name'];
  /**
   * Sets the flavour of the icon
   */
  variant?: 'icn1' | 'icn2' | 'icn3' | 'icn4';
  /**
   * Set a color on the svg defaults to black
   * Color name from the color palette are accepted
   */
  color?: keyof typeof colors['hex'];
  /**
   * State of the button
   */
  disabled?: boolean;
  /**
   * onClick callback for clickable icons
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}

/**
 * Primary icon component with interactive variants
 */
export const Icon = ({
  className,
  name,
  variant = 'icn1',
  color = 'black',
  disabled = false,
  onClick = null,
  ...props
}: IconProps) => {
  const C = {
    icn1: Bordered,
    icn2: NoBorder,
    icn3: NoBackground,
    icn4: BlackBackground,
  };

  const Component = C[variant];

  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onClick) && onClick(extendedEvent);
  };

  return (
    <ResetButton name={name} disabled={disabled} onClick={callback} {...props}>
      <Component
        className={className}
        disabled={disabled}
        color={disabled ? 'black' : color}
      >
        <Svg
          name={name}
          width="1em"
          height="1em"
          color={disabled ? 'black' : colors.hex[color] || color || 'black'}
        />
      </Component>
    </ResetButton>
  );
};
