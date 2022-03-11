import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {CheckBox, CheckBoxProps} from '.';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {onSelection: {action: 'clicked'}},
} as Meta;

const Template: Story<CheckBoxProps> = args => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: ['Check Box 1', 'Check Box 2', 'Targeted Disabling'],
  disableSpecificLabel: ['Targeted Disabling'],
};
