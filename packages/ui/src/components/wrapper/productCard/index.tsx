import React from "react";
import Image from "next/image";
import { Button } from "../../form/button";
import {
  BUTTON_BACKGROUND_COLORS,
  IconName,
} from "../../form/button/helpers/constans";
import Tooltip from "../tooltip";

export interface ProductCardProps {
  onClickButtonFirst?: () => void;
  labelButtonFirst?: string;
  iconButtonFirst?: IconName;
  bgButtonFirst?: keyof typeof BUTTON_BACKGROUND_COLORS;
  tootlipButtonFirst?: string;
  onClickButtonSecond?: () => void;
  labelButtonSecond?: string;
  iconButtonSecond?: IconName;
  bgButtonSecond?: keyof typeof BUTTON_BACKGROUND_COLORS;
  tootlipButtonSecond?: string;
  onClickButtonThird?: () => void;
  labelButtonThird?: string;
  iconButtonThird?: IconName;
  bgButtonThird?: keyof typeof BUTTON_BACKGROUND_COLORS;
  tootlipButtonThird?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  width?: number | "full";
  height?: number;
  price?: number;
  sizeButton?: "small" | "default";
  flexDirection?: "row" | "column";
}

export const ProductCard = ({
  onClickButtonFirst,
  labelButtonFirst = "",
  iconButtonFirst,
  bgButtonFirst = "BLUE",
  tootlipButtonFirst,
  onClickButtonSecond,
  labelButtonSecond = "",
  iconButtonSecond,
  bgButtonSecond = "PURPLE",
  tootlipButtonSecond,
  onClickButtonThird,
  labelButtonThird = "",
  iconButtonThird,
  bgButtonThird = "GREEN",
  tootlipButtonThird,
  imageUrl = "",
  title = "",
  description = "",
  width = "full",
  price,
  sizeButton = "default",
  flexDirection = "row",
  height = 250,
}: ProductCardProps) => {
  const widthStyle = {
    width: typeof width === "number" ? `${width}px` : "100%",
  };
  return (
    <div
      className={`border border-gray-300 shadow-xl rounded-lg overflow-hidden`}
      style={widthStyle}
    >
      <div className="relative overflow-hidden bg-white" style={{ height }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Product Image"
            fill
            className="h-full object-contain object-center transition-transform duration-500 hover:scale-140 mx-auto"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
        <div className="absolute cursor-default bottom-0 right-0 bg-gray-900 rounded-tl-lg text-white p-2 text-sm shadow-[-0px_-0px_6px_rgba(255,255,255,0.8)]">
          $ {price?.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>
      <div className="px-4 pb-4 pt-1 bg-gray-100">
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-sm text-gray-600 h-10 line-clamp-2">{description}</p>
        <div
          className={`flex w-full justify-between mt-4 ${flexDirection === "column" ? "flex-col " : "flex-row"} gap-4`}
        >
          {onClickButtonFirst && (
            <Tooltip position="top" message={tootlipButtonFirst || ""}>
              <Button
                onClick={onClickButtonFirst}
                label={labelButtonFirst}
                backgroundColor={bgButtonFirst}
                icon={iconButtonFirst}
                size={sizeButton}
                width="100%"
              />
            </Tooltip>
          )}
          {onClickButtonSecond && (
            <Tooltip position="top" message={tootlipButtonSecond || ""}>
              <Button
                onClick={onClickButtonSecond}
                label={labelButtonSecond}
                backgroundColor={bgButtonSecond}
                icon={iconButtonSecond}
                size={sizeButton}
                width="100%"
              />
            </Tooltip>
          )}
          {onClickButtonThird && (
            <Tooltip position="top" message={tootlipButtonThird || ""}>
              <Button
                onClick={onClickButtonThird}
                label={labelButtonThird}
                backgroundColor={bgButtonThird}
                icon={iconButtonThird}
                size={sizeButton}
                width="100%"
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
