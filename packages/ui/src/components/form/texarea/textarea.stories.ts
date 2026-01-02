import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import React, { useState } from "react";
import Textarea from ".";
import { InteractiveTextareaWrapper } from "./InteractiveTextareaWrapper";

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
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
    richText: {
      control: "boolean",
      description: "Activa el editor de texto enriquecido",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper para RichText
const InteractiveRichTextWrapper = (
  args: React.ComponentProps<typeof Textarea>
) => {
  const [value, setValue] = useState<string>((args?.value as string) || "");

  return React.createElement(
    "div",
    { style: { width: "600px" } },
    React.createElement(Textarea, {
      ...args,
      value: value,
      richText: true,
      onRichTextChange: (content: string) => {
        setValue(content);
        const syntheticEvent = {
          target: { value: content },
          currentTarget: { value: content },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        args?.onChange?.(syntheticEvent);
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          marginTop: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "4px",
        },
      },
      React.createElement("strong", null, "HTML Output:"),
      React.createElement(
        "pre",
        {
          style: {
            marginTop: "10px",
            fontSize: "12px",
            overflow: "auto",
          },
        },
        value || "<p></p>"
      )
    )
  );
};

export const Default: Story = {
  args: {
    label: "Descripción",
    placeholder: "Escribe una descripción...",
    appName: "web",
    isDisabled: false,
  },
  render: InteractiveTextareaWrapper,
};

export const RichText: Story = {
  args: {
    label: "Descripción del producto",
    placeholder: "Escribe una descripción detallada con formato...",
    appName: "web",
    isDisabled: false,
  },
  render: InteractiveRichTextWrapper,
};

export const RichTextWithContent: Story = {
  args: {
    label: "Contenido",
    value:
      "<p>Este es un <strong>texto de ejemplo</strong> con <em>formato</em>.</p><ul><li>Item 1</li><li>Item 2</li></ul>",
    placeholder: "Escribe algo...",
    appName: "web",
    isDisabled: false,
  },
  render: InteractiveRichTextWrapper,
};

export const Error: Story = {
  args: {
    label: "Descripción",
    appName: "web",
    error: "Este campo es obligatorio",
    isDisabled: false,
  },
  render: InteractiveTextareaWrapper,
};

export const HelperText: Story = {
  args: {
    label: "Descripción",
    appName: "web",
    helperText: "Ingrese una descripción detallada",
    isDisabled: false,
  },
  render: InteractiveTextareaWrapper,
};

export const Disabled: Story = {
  args: {
    label: "Descripción",
    value: "Este contenido está deshabilitado",
    appName: "web",
    isDisabled: true,
  },
  render: InteractiveTextareaWrapper,
};

export const DisabledRichText: Story = {
  args: {
    label: "Descripción",
    value: "<p>Este contenido está <strong>deshabilitado</strong>.</p>",
    appName: "web",
    isDisabled: true,
  },
  render: InteractiveRichTextWrapper,
};
