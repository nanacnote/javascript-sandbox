import React from 'react';
import {assertFnProp} from '@utils/domHelpers';
import proxyEvent from '@utils/proxyEvent';

import Wrapper from './style/Wrapper';
import Knob from './style/Knob';
import Input from './style/Input';
import Label from './style/Label';

export interface TogglerProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;
  /**
   * Sets the name attribute to associate with form submission
   */
  name: string;
  /**
   * Callback triggered on toggle change
   */
  onChange?: (event: React.ChangeEventHandler<HTMLInputElement>) => void | null;
}

/**
 * Primary UI for input toggle selector.
 */
export const Toggler = ({
  className,
  name,
  onChange = null,
  ...props
}: TogglerProps) => {
  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onChange) && onChange(extendedEvent);
  };
  return (
    <Wrapper className={className}>
      <Label>
        <Input name={name} {...props} type="checkbox" onChange={callback} />
        <Knob />
      </Label>
    </Wrapper>
  );
};
