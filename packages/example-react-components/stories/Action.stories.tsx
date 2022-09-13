import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Action } from '../src/lib/Action';

export default {
  component: Action,
  title: 'Action',
} as ComponentMeta<typeof Action>;

const Template: ComponentStory<typeof Action> = (args) => <Action {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
};
