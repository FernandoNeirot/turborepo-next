import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import React, { useState } from "react";
import SidebarMobile, { type SidebarMobileProps } from ".";

// Wrapper component para manejar el estado de isOpen
const SidebarMobileWrapper = (args: SidebarMobileProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Abrir Sidebar
      </button>
      <SidebarMobile
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose();
        }}
      />
    </div>
  );
};

const meta: Meta<SidebarMobileProps> = {
  title: "Single/SidebarMobile",
  component: SidebarMobile,
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
      description: "Controla si el sidebar está abierto o cerrado",
    },
    user: {
      control: "text",
      description: "Nombre del usuario para mostrar en la cabecera",
    },
    isAuth: {
      control: "boolean",
      description: "Indica si el usuario está autenticado",
    },
    onClose: {
      action: "closed",
      description: "Callback cuando se cierra el sidebar",
    },
    onDashboardClick: {
      action: "dashboard-clicked",
      description: 'Callback cuando se hace clic en "Mi Dashboard"',
    },
    onLogoutClick: {
      action: "logout-clicked",
      description: 'Callback cuando se hace clic en "Cerrar sesión"',
    },
    onLoginClick: {
      action: "login-clicked",
      description: 'Callback cuando se hace clic en "Ingresar con Google"',
    },
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onDashboardClick: fn(),
    onLogoutClick: fn(),
    onLoginClick: fn(),
  },
};

export default meta;
type Story = StoryObj<SidebarMobileProps>;

export const Authenticated: Story = {
  render: (args) => <SidebarMobileWrapper {...args} />,
  args: {
    isOpen: true,
    user: "Juan Pérez",
    isAuth: true,
    onClose: fn(),
    onDashboardClick: fn(),
    onLogoutClick: fn(),
  },
};

export const NotAuthenticated: Story = {
  render: (args) => <SidebarMobileWrapper {...args} />,
  args: {
    isOpen: true,
    isAuth: false,
    onClose: fn(),
    onLoginClick: fn(),
  },
};

export const WithoutUser: Story = {
  render: (args) => <SidebarMobileWrapper {...args} />,
  args: {
    isOpen: true,
    user: null,
    isAuth: true,
    onClose: fn(),
    onDashboardClick: fn(),
    onLogoutClick: fn(),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    user: "Juan Pérez",
    isAuth: true,
    onClose: fn(),
    onDashboardClick: fn(),
    onLogoutClick: fn(),
  },
};
