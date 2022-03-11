import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Form, FormProps} from '.';

const Component = () => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div>Forms button is enable once all inputs pass validation.</div>
    <br />
    <div>
      <label htmlFor="firstName">First name:</label>
      <br />
      <input
        style={{width: '350px'}}
        type="text"
        id="firstName"
        name="firstName"
        placeholder={'type "validate first name" to pass validation'}
        onInput={event => {
          if (event.currentTarget.value === 'validate first name') {
            event.currentTarget.dataset.validate = 'true';
          } else {
            event.currentTarget.dataset.validate = 'false';
          }
        }}
        data-validate="false"
      />
      <br />
      <label htmlFor="lastName">Last name:</label>
      <br />
      <input
        style={{width: '350px'}}
        type="text"
        id="lastName"
        name="lastName"
        placeholder={'type "validate last name" to pass validation'}
        onInput={event => {
          if (event.currentTarget.value === 'validate last name') {
            event.currentTarget.dataset.validate = 'true';
          } else {
            event.currentTarget.dataset.validate = 'false';
          }
        }}
        data-validate="false"
      />
      <br />
      <br />
      <button type="submit">submit</button>
    </div>
  </div>
);

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {actions: {argTypesRegex: '^(before|on).*'}},
  argTypes: {},
} as Meta;

const Template: Story<FormProps> = args => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Component />,
  onSubmit: () => alert(':)'),
};
