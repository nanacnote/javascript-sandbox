import React from 'react';
import {assertFnProp} from '@utils/domHelpers';
import proxyEvent from '@utils/proxyEvent';

import Fragment from './style/Fragment';
import Label from './style/Label';
import Check from './style/Check';

export interface CheckBoxProps {
  /**
   * Sets a custom class to div which wraps both the input and label html element used to build this component.
   * When using an array of checkbox elements this class will apply to each checkbox individually.
   */
  className?: string;
  /**
   * checkbox label accept a string for a single or array for multiple
   */
  label: string | string[];
  /**
   * State of the checkbox
   */
  disabled?: boolean;
  /**
   * State of a specific checkbox. This string must be same as label.
   * Use a string for single checkbox disable or and array for multiple
   */
  disableSpecificLabel?: string | string[];
  /**
   * Callback triggered on selection of a checkbox.
   */
  onSelection?: (event: React.FocusEvent<HTMLInputElement>) => void | null;
}

/**
 * A checkbox component with an onSelection callback function.
 * `onSelection: (event)=>void` the event has the custom `@extEvent`
 * property for convenience
 */
export const CheckBox = ({
  className,
  label,
  disabled = false,
  disableSpecificLabel,
  onSelection = null,
  ...props
}: CheckBoxProps) => {
  const labelList = Array.isArray(label) ? [...label] : [label];
  const disableSpecificList = Array.isArray(disableSpecificLabel)
    ? [...disableSpecificLabel]
    : [disableSpecificLabel];

  const callback = event => {
    const extendedEvent = proxyEvent(event);
    assertFnProp(onSelection) && onSelection(extendedEvent);
  };

  // TODO:
  // extend when extra fine grain control is needed by passing
  // individual extra user required props to both input and label
  // eg. `labelProps`and `inputProps`

  return (
    <>
      {labelList.map((label, index) => (
        <Fragment className={className} key={label}>
          <Check
            type="checkbox"
            id={`id-${index}-${label.trim().split(' ').join(',')}`}
            name="checkbox-group"
            disabled={disabled || disableSpecificList.includes(label)}
            onFocus={callback}
          />
          <Label htmlFor={`id-${index}-${label.trim().split(' ').join(',')}`}>
            {label}
          </Label>
        </Fragment>
      ))}
    </>
  );
};
