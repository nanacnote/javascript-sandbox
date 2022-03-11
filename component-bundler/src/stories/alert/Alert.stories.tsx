import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Alert, AlertProps} from '.';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<AlertProps> = args => <Alert {...args} />;

export const Error = Template.bind({});
Error.args = {
  variant: 'error',
  message: 'There was an error somewhere! Please try again',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  message: 'Some success feedback',
};
