import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Header, { type HeaderProps } from ".";

const meta: Meta<HeaderProps> = {
  title: "Single/Header",
  component: Header,
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
  argTypes: {},
  args: {
    onClickLogo: () => alert("Logo clicked!"),
    onWelcomeClick: () => alert("Welcome clicked!"),
    onClickLogin: () => alert("Login clicked!"),
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;
export const label: Story = {
  render: (args: HeaderProps) => (
    <div style={{ width: 750, margin: "0 auto" }}>
      <Header {...args} />
    </div>
  ),
  args: {
    title: "My Application",
    subTitle: "Making life easier",
    logoUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/053/382/798/small/the-logo-for-a-company-that-makes-colorful-abstract-shapes-free-png.png",
    welcomeLabel: "Welcome, User!",
    isAuthenticated: true,
    onWelcomeClick: () => alert("Welcome clicked!"),
    maxWidth: "450px",
  },
};
