import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {IconWithDropdown, IconWithDropdownProps} from '.';

const Trigger = () => (
  <div
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '40px',
      border: 'solid 2px springgreen',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <span>C</span>
  </div>
);
const Comp1 = () => (
  <div className="px-3 py-1" style={{whiteSpace: 'nowrap'}}>
    Array Item One
  </div>
);
const Comp2 = () => (
  <div className="px-3 py-1" style={{whiteSpace: 'nowrap'}}>
    Array Item Two
  </div>
);
const Comp3 = () => (
  <div className="px-3 py-1" style={{whiteSpace: 'nowrap'}}>
    Array Item Three
  </div>
);
const CompSingle = () => (
  <div className="text-center p-4">
    Sing Item <br />
    can have nested <br />
    components
  </div>
);

export default {
  title: 'Components/IconWithDropdown',
  component: IconWithDropdown,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<IconWithDropdownProps> = args => (
  <IconWithDropdown {...args} />
);

export const Array = Template.bind({});
Array.args = {
  triggerComponent: <Trigger />,
  children: [
    <Comp1 key="comp1" />,
    <Comp2 key="comp2" />,
    <Comp3 key="comp3" />,
  ],
};

export const Single = Template.bind({});
Single.args = {
  triggerComponent: <Trigger />,
  children: <CompSingle />,
};
