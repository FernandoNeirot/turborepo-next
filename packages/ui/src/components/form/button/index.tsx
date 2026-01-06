import React from "react";
import {
  BUTTON_BACKGROUND_COLORS,
  iconMap,
  type IconName,
} from "./helpers/constans";

export interface ButtonProps {
  backgroundColor?: keyof typeof BUTTON_BACKGROUND_COLORS;
  textColor?: string;
  label?: string;
  size?: "small" | "default";
  variant?: "default" | "search";
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName | null;
  labelTooltip?: string;
  width?: string;
  type?: "button" | "submit" | "reset";
  height?: string;
}

export const Button = ({
  icon,
  backgroundColor = "BLUE",
  textColor = "#fff",
  size = "default",
  isDisabled = false,
  label,
  variant = "default",
  onClick,
  width,
  type = "button",
  height,
  labelTooltip,
}: ButtonProps) => {
  const IconComponent =
    icon && icon !== "none" && iconMap[icon] ? iconMap[icon].icon : null;

  const accessibleName =
    label ||
    labelTooltip ||
    (icon && icon !== "none" && iconMap[icon]?.name) ||
    "Button";

  return (
    <button
      disabled={isDisabled}
      type={type}
      aria-label={!label ? accessibleName : undefined}
      title={labelTooltip}
      className={`
        whitespace-nowrap
      ${size === "small" ? "px-3 text-sm" : "px-4 py-2 text-base"}
      ${!backgroundColor.includes("TRANSPARENT") ? "shadow-md" : ""} px-2 rounded${variant === "search" ? "-r-xl" : "-lg"} font-semibold transition-colors flex items-center justify-center
      ${isDisabled
          ? "bg-gray-200 cursor-not-allowed text-gray-300"
          : `${BUTTON_BACKGROUND_COLORS[backgroundColor]} cursor-pointer text-white`
        }
      `}
      onClick={() => (isDisabled ? undefined : onClick())}
      style={{
        color: textColor,
        width: width ? width : "",
        height: height ? height : "",
      }}
    >
      {IconComponent && (
        <IconComponent
          className={`${size === "small" ? "w-4 h-4" : "w-5 h-5"}`}
          aria-hidden="true"
        />
      )}
      {label && (
        <span className={`${IconComponent ? "ml-2" : ""}`}>{label}</span>
      )}
    </button>
  );
};
