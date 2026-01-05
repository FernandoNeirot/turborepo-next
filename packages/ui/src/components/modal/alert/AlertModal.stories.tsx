import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "storybook/test";
import AlertModal, { type AlertModalProps } from ".";

const meta: Meta<AlertModalProps> = {
  title: "Modal/Alert",
  component: AlertModal,
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
    isOpen: {
      control: "boolean",
      description: "Controla si el modal está abierto o cerrado",
    },
    title: {
      control: "text",
      description: "Título del modal de alerta",
    },
    description: {
      control: "text",
      description: "Descripción del modal de alerta",
    },
    variant: {
      control: "select",
      options: ["success", "error", "warning", "default"],
      description: "Variante visual del modal",
    },
    onClose: {
      action: "closed",
      description: "Función que se ejecuta al cerrar el modal",
    },
  },
  args: {
    isOpen: true,
    title: "Alerta",
    description: "Este es un mensaje de alerta",
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Alerta",
    description: "Este es un mensaje de alerta predeterminado",
    onClose: fn(),
  },
};

export const LongDescription: Story = {
  args: {
    isOpen: true,
    title: "Alerta Importante",
    description:
      "Este es un mensaje de alerta con una descripción más larga para demostrar cómo se ve el modal cuando el contenido es extenso. El modal debería ajustarse correctamente al contenido.",
    onClose: fn(),
  },
};

export const ShortContent: Story = {
  args: {
    isOpen: true,
    title: "¡Atención!",
    description: "Mensaje corto",
    onClose: fn(),
  },
};

export const Success: Story = {
  args: {
    isOpen: true,
    title: "Éxito",
    description: "La operación se completó correctamente.",
    variant: "success",
    onClose: fn(),
  },
};

export const Error: Story = {
  args: {
    isOpen: true,
    title: "Error",
    description:
      "Ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente.",
    variant: "error",
    onClose: fn(),
  },
};

export const Warning: Story = {
  args: {
    isOpen: true,
    title: "Advertencia",
    description: "Por favor, revisa la información antes de continuar.",
    variant: "warning",
    onClose: fn(),
  },
};
