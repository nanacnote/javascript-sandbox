import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Toggler, TogglerProps} from '.';

export default {
  title: 'Components/Toggler',
  component: Toggler,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<TogglerProps> = args => <Toggler {...args} />;

export const Default = Template.bind({});
Default.args = {};
