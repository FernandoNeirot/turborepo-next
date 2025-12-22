import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { fn } from 'storybook/test';
import Input from '.';
import { InteractiveInputWrapper } from './InteractiveInputWrapper';

const meta = {
  title: 'Form/Input',
  component: Input,
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
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const init: Story = {
  args: {
    label: 'Nombre',
    appName: "web",
    isDisabled: false,
  },
  render: InteractiveInputWrapper,
};
export const Error: Story = {
  args: {
    label: 'Nombre',
    appName: "web",    
    error: 'Este campo es obligatorio',
    isDisabled: false,
  },
  render: InteractiveInputWrapper,
};
export const helperText: Story = {
  args: {
    label: 'Nombre',
    appName: "web",    
    helperText: 'Ingrese su nombre completo',
    isDisabled: false,
  },
  render: InteractiveInputWrapper,
};
export const disabled: Story = {
  args: {
    label: 'Nombre',
    appName: "web",    
    helperText: 'Ingrese su nombre completo',
    isDisabled: true,
  },
  render: InteractiveInputWrapper,
};