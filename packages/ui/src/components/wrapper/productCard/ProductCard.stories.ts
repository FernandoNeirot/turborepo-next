import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';
import { ProductCard } from '.';



const meta = {
  title: 'Wrapper/ProductCard',
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
  args: { onClickButtonFirst: fn(), onClickButtonSecond: fn(), onClickButtonThird: fn() },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Init: Story = {
  args: {
    imageUrl: "https://www.duchos.com.ar/images/art-410-1.webp",
    labelButtonFirst: "",
    iconButtonFirst: "view",
    bgButtonFirst: "BLUE",
    tootlipButtonFirst: "Ver producto",
    labelButtonSecond: "",
    iconButtonSecond: "edit",
    bgButtonSecond: "GREEN",
    tootlipButtonSecond: "Editar producto",
    labelButtonThird: "",
    iconButtonThird: "delete",
    bgButtonThird: "PURPLE",
    tootlipButtonThird: "Eliminar producto",
    title: "Producto de ejemplo",
    width: 350,
    price: 2500,
    description: "Esta es una descripción de ejemplo para el producto. Esta es una descripción de ejemplo para el producto.",
    flexDirection: "row",
    sizeButton: "default",
  },
};
