import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Example/Button',
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
    // backgroundColor: { control: 'color' },
  },  
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Activo: Story = {
  args: {
    label: 'Guardar',
    appName: "web"
  },
};
