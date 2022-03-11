import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Notification, NotificationProps} from '.';

export default {
  title: 'Components/Notification',
  component: Notification,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<NotificationProps> = args => <Notification {...args} />;

export const Black = Template.bind({});
Black.args = {
  variant: 'black',
  children: 'This is a notification.',
  iconName: 'settings_outline_regular',
};

export const Gray = Template.bind({});
Gray.args = {
  variant: 'gray',
  children: 'This is a another notification!',
  iconName: 'bin_outline_regular',
};

export const Gradient = Template.bind({});
Gradient.args = {
  variant: 'gradient',
  children: 'This is a third notification!',
  iconName: 'exit_outline_regular',
};
