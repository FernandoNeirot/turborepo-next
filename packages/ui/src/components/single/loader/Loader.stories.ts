import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from ".";

const meta = {
  title: "Single/Loader",
  component: Loader,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Controla si el loader está visible o no",
    },
    message: {
      control: "text",
      description: "Mensaje que se muestra debajo del spinner",
    },
  },
  args: {
    isLoading: true,
    message: "Cargando...",
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: true,
    message: "Cargando...",
  },
};

export const CustomMessage: Story = {
  args: {
    isLoading: true,
    message: "Procesando tu solicitud...",
  },
};

export const LongMessage: Story = {
  args: {
    isLoading: true,
    message: "Esto puede tardar unos momentos, por favor espera...",
  },
};

export const NoMessage: Story = {
  args: {
    isLoading: true,
    message: "",
  },
};

export const Hidden: Story = {
  args: {
    isLoading: false,
    message: "Cargando...",
  },
};
