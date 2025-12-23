import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';
import { ProductCard } from '.';



const meta = {
  title: 'Form/ProductCard',
  component: ProductCard,
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
  args: { onClickButtonLeft: fn(), onClickButtonRight: fn() },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Init: Story = {
  args: {
    imageUrl: "https://www.duchos.com.ar/images/art-410-1.webp",
    labelButtonLeft: "Ver detalle",
    iconButtonLeft: "view",
    bgButtonLeft: "BLUE",
    labelButtonRight: "Agregar",
    iconButtonRight: "cart",
    bgButtonRight: "GREEN",
    title: "Producto de ejemplo",
    width: 350,
    price: 2500,
    description: "Esta es una descripción de ejemplo para el producto. Esta es una descripción de ejemplo para el producto.",
    flexDirection: "column",
    sizeButton: "default",
  },
};
