import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Separator, SeparatorProps} from '.';

export default {
  title: 'Components/Separator',
  component: Separator,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {
    style: {
      table: {disable: true},
    },
  },
} as Meta;

const Template: Story<SeparatorProps> = args => <Separator {...args} />;

export const Gray = Template.bind({});
Gray.args = {
  variant: 'gray',
  style: {width: '250px'},
};

export const Gradient = Template.bind({});
Gradient.args = {
  variant: 'gradient',
  style: {width: '250px'},
};
