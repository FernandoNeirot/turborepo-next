import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';

import { iconNames } from './helpers/iconMap';
import { Search } from '.';

const meta = {
  title: 'Form/Search',
  component: Search,
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
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const label: Story = {
  args: {
    label: 'Guardar',
    appName: "web",
    isDisabled: false,
    variant: 'search',
    onChange:(e) => console.log("cambio", e.target.value),
  },
};
