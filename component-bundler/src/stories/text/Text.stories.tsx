import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Text, TextProps} from '.';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<TextProps> = args => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: 'A primary text string',
};

export const PrimaryHtml = Template.bind({});
PrimaryHtml.args = {
  data: `
    <span style="font-size: 2em;color:springgreen">A html text string</span>
    <span style="display:block;text-align:center;font-size: 1.5em;color:orange">styled in line</span>
    `,
};

export const Gradient = Template.bind({});
Gradient.args = {
  variant: 'gradient',
  data: 'A primary text string',
};
