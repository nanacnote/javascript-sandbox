import React from 'react';

import Error from './style/Error';
import Success from './style/Success';

export interface AlertProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Sets the flavour of the alert
   */
  variant?: 'error' | 'success';
  /**
   * Sets the content of the alert can be string or JSX
   */
  message?: React.ReactNode;
}

/**
 * Primary alert banner component
 */
export const Alert = ({
  className,
  variant = 'error',
  message,
  ...props
}: AlertProps) => {
  const E: {[key in AlertProps['variant']]} = {
    error: Error,
    success: Success,
  };
  const AlertVariant = E[variant];

  return (
    <AlertVariant
      className={className}
      isVisible={message && !!message.toString()}
      {...props}
    >
      {message}
    </AlertVariant>
  );
};
