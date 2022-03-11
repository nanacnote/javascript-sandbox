import React from 'react';
import {assertFnProp} from '@utils/domHelpers';
import proxyEvent from '@utils/proxyEvent';

import {SvgProps} from '@stories/svg';
import colors from '@shared/colors';

import Bar from './style/Bar';
import Icon from './style/Icon';
import Dismiss from './style/Dismiss';
import Fragment from './style/Fragment';
import ResetButton from './style/ResetButton';
import CloseIcon from './style/CloseIcon';

export interface NotificationProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Determines the flavour of notification
   */
  variant?: 'black' | 'gradient' | 'gray' | 'rounded';
  /**
   * Sets Icon on notification bar
   */
  iconName?: SvgProps['name'];
  /**
   * Sets children component
   */
  children?: React.ReactNode;
  /**
   * onClose callback for close icons
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void | null;
}

/**
 * Primary notification component in multiple variants
 */
export const Notification = ({
  className,
  variant = 'black',
  iconName,
  children,
  onClose = null,
  ...props
}: NotificationProps) => {
  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onClose) && onClose(extendedEvent);
  };

  return (
    <>
      <Bar className={className} variant={variant}>
        <Icon
          name={iconName}
          color={variant === 'gray' ? colors.hex.black : colors.hex.white}
        />
        <Fragment>{children}</Fragment>
        <ResetButton onClick={callback}>
          <Dismiss>
            <CloseIcon
              name="cross_outline_regular"
              color={variant === 'gray' ? colors.hex.black : colors.hex.white}
            />
          </Dismiss>
        </ResetButton>
      </Bar>
    </>
  );
};
