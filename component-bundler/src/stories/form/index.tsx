import React, {useEffect} from 'react';
import proxyEvent from '@utils/proxyEvent';
import {assertFnProp} from '@utils/domHelpers';

import FormWrapper from './style/FormWrapper';
import {useRef} from 'react';
import {debounce} from 'lodash';

export interface FormProps {
  /**
   * Sets a custom class to root of component.
   */
  className?: string;

  /**
   * Sets children component
   */
  children?: React.ReactNode;
  /**
   * Sets children component
   */
  override?: boolean;
  /**
   * onSubmit callback
   */
  onSubmit?: (event: React.FormEventHandler<HTMLFormElement>) => void | null;
}

/**
 * Primary UI form component this form disables its submit button until the inputs pass validation.
 * A pass validation means the input has a `data-validate=true` attribute
 *
 * IMPORTANT:
 * The children has to include at least one input and a button or input set to `type=submit`
 * The input must have a data-validate attribute which tracks validity of the input.
 *
 * HINT:
 * Best to always use in collaboration with `*input` element from this library for full performance.
 */
export const Form = ({
  className,
  children,
  override,
  onSubmit,
  ...props
}: FormProps) => {
  const formRef = useRef(null);
  const inputElement = useRef(null);
  const submitElement = useRef(null);

  const callback = event => {
    event.preventDefault();
    const extendedEvent = proxyEvent(event);
    assertFnProp(onSubmit) && onSubmit(extendedEvent);
  };

  const failedValidation = str => {
    const regex = /^\s*(true|1|on)\s*$/i;
    return !regex.test(str);
  };

  const handleInputValidity = () => {
    if (override) return;
    for (const input of inputElement.current) {
      if (failedValidation(input.dataset?.validate)) {
        submitElement.current.disabled = true;
        break;
      } else {
        submitElement.current.disabled = false;
      }
    }
  };
  const debouncedHandleInputValidity = debounce(handleInputValidity, 750);

  useEffect(() => {
    inputElement.current = formRef.current.querySelectorAll('[data-validate]');
    submitElement.current = formRef.current.querySelector('*[type=submit]');
    handleInputValidity();

    submitElement.current.addEventListener(
      'mouseenter',
      debouncedHandleInputValidity,
      false
    );
    for (const input of inputElement.current) {
      input.addEventListener('change', debouncedHandleInputValidity, false);
      input.addEventListener('input', debouncedHandleInputValidity, false);
      input.addEventListener('blur', debouncedHandleInputValidity, false);
    }

    return () => {
      submitElement.current.removeEventListener(
        'mouseenter',
        debouncedHandleInputValidity,
        false
      );
      for (const input of inputElement.current) {
        input.removeEventListener(
          'change',
          debouncedHandleInputValidity,
          false
        );
        input.removeEventListener('input', debouncedHandleInputValidity, false);
        input.removeEventListener('blur', debouncedHandleInputValidity, false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormWrapper
      ref={formRef}
      className={className}
      onSubmit={callback}
      {...props}
    >
      {children}
    </FormWrapper>
  );
};
