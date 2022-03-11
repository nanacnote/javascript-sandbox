import React, {useEffect, useState} from 'react';

import Wrapper from './style/Wrapper';
import ResetButton from './style/ResetButton';
import Selector from './style/Selector';
import DropdownWrapper from './style/DropdownWrapper';
import Dropdown from './style/Dropdown';

export interface IconWithDropdownProps {
  /**
   * Sets a custom class to dropdown content wrapper.
   */
  className?: string;
  /**
   * State of the component
   */
  disabled?: boolean;
  /**
   * Icon to use as dropdown trigger
   * this should not be a button as onClick is handled internally
   */
  triggerComponent: JSX.Element;
  /**
   * Components to render into the dropdown
   */
  children: JSX.Element | JSX.Element[];
}

/**
 * UI component for a dropdown showing only an icon in closed state
 */
export const IconWithDropdown = ({
  className,
  disabled,
  triggerComponent,
  children,
  ...props
}: IconWithDropdownProps) => {
  return (
    <Wrapper className={className}>
      <ResetButton disabled={disabled}>{triggerComponent}</ResetButton>
      <DropdownWrapper>
        <Dropdown>{children}</Dropdown>
      </DropdownWrapper>
    </Wrapper>
  );
};
