import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {RadioButton, RadioButtonProps} from '.';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {onSelection: {action: 'clicked'}},
} as Meta;

const Template: Story<RadioButtonProps> = args => <RadioButton {...args} />;

export const rd1 = Template.bind({});
rd1.args = {
  label: ['Radio Button 1', 'Radio Button 2', 'Radio Button 3'],
};

export const rd2 = Template.bind({});
rd2.args = {
  variant: 'rd2',
  checkedLabel: 'Radio Button 1',
  label: ['Radio Button 1', 'Radio Button 2'],
};
