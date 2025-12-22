import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Button } from '.';
import { iconNames } from './helpers/iconMap';

const meta = {
  title: 'Form/Button',
  component: Button,
  parameters: {  
    layout: 'centered',
    backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#333333' },
    ],
  },
  },  
  tags: ['autodocs'],  
  argTypes: {
    icon: { control: 'select', options: [...iconNames, null] },
    variant: { control: 'select', options: ['default', 'delete'] },
  },  
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const label: Story = {
  args: {
    label: 'Guardar',
    appName: "web",
    isDisabled: false,
  },
};
export const disabled: Story = {
  args: {
    label: 'Guardar',
    appName: "web",
    isDisabled: true,
  },
};
export const LabelConIcon: Story = {
  args: {
    label: 'Guardar',
    appName: "web",
    icon: 'search',
    isDisabled: false,
  },
};
export const OnlyIcon: Story = {
  args: {
    appName: "web",
    icon: 'search',
    isDisabled: false,
  },
};
