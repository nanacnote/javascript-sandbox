import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Link, LinkProps} from '.';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<LinkProps> = args => <Link {...args} />;

export const Black = Template.bind({});
Black.args = {
  label: 'Follow me',
  variant: 'black',
};
export const Blue = Template.bind({});
Blue.args = {
  label: 'Follow me',
  variant: 'blue',
};

export const Gray = Template.bind({});
Gray.args = {
  label: 'Follow me',
  variant: 'gray',
};

export const Gradient = Template.bind({});
Gradient.args = {
  label: 'Follow me',
  variant: 'gradient',
};
