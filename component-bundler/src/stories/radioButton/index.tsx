import React from 'react';
import {assertFnProp} from '@utils/domHelpers';
import proxyEvent from '@utils/proxyEvent';

import Fragment from './style/Fragment';
import Radio1 from './style/Radio1';
import Label1 from './style/Label1';
import Radio2 from './style/Radio2';
import Label2 from './style/Label2';

export interface RadioButtonProps {
  /**
   * Sets a custom class to div which wraps both the input and label html element used to build this component.
   * When using an array of radio elements this class will apply to each radio button individually.
   */
  className?: string;
  /**
   * Radio button label accept a string for a single or array for multiple
   */
  label: string | string[];
  /**
   * Set the name to associate with the radio group
   */
  inputName?: string;
  /**
   * Sets the type
   */
  variant?: 'rd1' | 'rd2';
  /**
   * State of the radio button
   */
  disabled?: boolean;
  /**
   * State of a specific radio button. This string must be same as label.
   * Use a string for single radio button disable or and array for multiple
   */
  disableSpecificLabel?: string | string[];
  /**
   * Sets the default selection by way its label
   */
  checkedLabel?: string;
  /**
   * Callback triggered on selection of a radio button.
   */
  onSelection?: (event: React.FocusEvent<HTMLInputElement>) => void | null;
}

/**
 * A radio button component with an onSelection callback function.
 * `onSelection: (event)=>void` the event has the custom `@extEvent`
 * property for convenience
 */
export const RadioButton = ({
  className,
  label,
  inputName = 'radio-group',
  variant = 'rd1',
  disabled = false,
  disableSpecificLabel,
  checkedLabel,
  onSelection = null,
  ...props
}: RadioButtonProps) => {
  const B: {[key in RadioButtonProps['variant']]} = {
    rd1: {radio: Radio1, label: Label1},
    rd2: {radio: Radio2, label: Label2},
  };
  const RadioVariant = B[variant].radio;
  const LabelVariant = B[variant].label;

  const labelList = Array.isArray(label) ? [...label] : [label];
  const disableSpecificList = Array.isArray(disableSpecificLabel)
    ? [...disableSpecificLabel]
    : [disableSpecificLabel];

  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onSelection) && onSelection(extendedEvent);
  };

  return (
    <>
      {labelList.map((label, index) => (
        <Fragment className={className} key={label}>
          <RadioVariant
            type="radio"
            id={`id-${index}-${label.trim().split(' ').join(',')}`}
            name={inputName}
            value={label}
            disabled={disabled || disableSpecificList.includes(label)}
            onFocus={callback}
            {...(checkedLabel === label && {defaultChecked: true})}
          />
          <LabelVariant
            htmlFor={`id-${index}-${label.trim().split(' ').join(',')}`}
          >
            {label}
          </LabelVariant>
        </Fragment>
      ))}
    </>
  );
};
