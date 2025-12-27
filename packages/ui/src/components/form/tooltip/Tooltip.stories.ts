import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { fn } from 'storybook/test';
import Tooltip, { type TooltipProps } from '.';

const meta: Meta<TooltipProps> = {
  title: 'Helper/Tooltip',
  component: Tooltip,
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
    
  },  
  args: { },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const label: Story = {
  args: {
    message: 'This is a tooltip message',
    children: React.createElement(
      'button',
      { className: 'px-4 py-2 bg-blue-500 text-white rounded' },
      'Hover me'
    ),
  },
};
