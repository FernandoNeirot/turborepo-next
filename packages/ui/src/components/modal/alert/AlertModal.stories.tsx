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
    onCancel: {
      action: "cancelled",
      description: "Función que se ejecuta al hacer clic en cancelar",
    },
    onContinue: {
      action: "continued",
      description: "Función que se ejecuta al hacer clic en continuar",
    },
    cancelLabel: {
      control: "text",
      description: "Texto del botón cancelar",
    },
    continueLabel: {
      control: "text",
      description: "Texto del botón continuar",
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

export const WithButtons: Story = {
  args: {
    isOpen: true,
    title: "Confirmar acción",
    description: "¿Estás seguro de que deseas continuar con esta acción?",
    variant: "default",
    onClose: fn(),
    onCancel: fn(),
    onContinue: fn(),
    cancelLabel: "Cancelar",
    continueLabel: "Continuar",
  },
};

export const WithButtonsSuccess: Story = {
  args: {
    isOpen: true,
    title: "Operación exitosa",
    description:
      "La operación se completó correctamente. ¿Deseas realizar otra acción?",
    variant: "success",
    onClose: fn(),
    onCancel: fn(),
    onContinue: fn(),
    cancelLabel: "No",
    continueLabel: "Sí",
  },
};

export const WithButtonsError: Story = {
  args: {
    isOpen: true,
    title: "Error crítico",
    description:
      "Ha ocurrido un error. ¿Deseas intentar nuevamente o cancelar?",
    variant: "error",
    onClose: fn(),
    onCancel: fn(),
    onContinue: fn(),
    cancelLabel: "Cancelar",
    continueLabel: "Reintentar",
  },
};

export const WithButtonsWarning: Story = {
  args: {
    isOpen: true,
    title: "Advertencia importante",
    description:
      "Esta acción no se puede deshacer. ¿Estás seguro de continuar?",
    variant: "warning",
    onClose: fn(),
    onCancel: fn(),
    onContinue: fn(),
    cancelLabel: "No, cancelar",
    continueLabel: "Sí, continuar",
  },
};

export const OnlyContinue: Story = {
  args: {
    isOpen: true,
    title: "Información",
    description:
      "Por favor, confirma que has leído y entendido la información.",
    variant: "default",
    onClose: fn(),
    onContinue: fn(),
    continueLabel: "Entendido",
  },
};

export const OnlyCancel: Story = {
  args: {
    isOpen: true,
    title: "Aviso",
    description: "Esta acción ha sido cancelada.",
    variant: "warning",
    onClose: fn(),
    onCancel: fn(),
    cancelLabel: "Cerrar",
  },
};

export const CustomLabels: Story = {
  args: {
    isOpen: true,
    title: "Confirmación personalizada",
    description:
      "Puedes personalizar los textos de los botones según tus necesidades.",
    variant: "default",
    onClose: fn(),
    onCancel: fn(),
    onContinue: fn(),
    cancelLabel: "No, gracias",
    continueLabel: "Aceptar",
  },
};
