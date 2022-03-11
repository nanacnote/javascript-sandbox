import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {DivButton, DivButtonProps} from '.';

const Child = () => (
  <div
    style={{
      border: 'solid 3px springgreen',
      padding: '2.5rem',
      textAlign: 'center',
    }}
  >
    This is a example
    <br />
    implementation
    <br />
    <br />
    Click
  </div>
);

export default {
  title: 'Components/DivButton',
  component: DivButton,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<DivButtonProps> = args => <DivButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Child />,
  onClick: () => alert('Clicked'),
};
