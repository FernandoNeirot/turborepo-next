import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Button } from '.';
import { iconNames } from './helpers/constans';

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
    icon: { control: 'select', options: [...iconNames] },
    variant: { control: 'select', options: ['default', 'delete'] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const label: Story = {
  args: {
    label: 'Guardar',
    isDisabled: false,
  },
};
export const disabled: Story = {
  args: {
    label: 'Guardar',
    isDisabled: true,
  },
};
export const LabelConIcon: Story = {
  args: {
    label: 'Guardar',
    icon: 'search',
    isDisabled: false,
  },
};
export const OnlyIcon: Story = {
  args: {
    icon: 'search',
    isDisabled: false,
  },
};
