'use client'
import Image from 'next/image';
import React from 'react';
import { Button } from '../../form/button';
import { BUTTON_BACKGROUND_COLORS, IconName } from '../../form/button/helpers/constans';

export interface ProductCardProps {
  onClickButtonLeft: () => void;
  labelButtonLeft?: string;
  iconButtonLeft?: IconName;
  onClickButtonRight: () => void;
  labelButtonRight?: string;
  iconButtonRight?: IconName;
  appName?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  width?: string;
  price?: number;
}

export const ProductCard = ({
  onClickButtonLeft,
  labelButtonLeft = "",
  iconButtonLeft,
  onClickButtonRight,
  labelButtonRight = "",
  iconButtonRight,
  imageUrl = "",
  title = "",
  description = "",
  width = "w-full",
  price
}: ProductCardProps) => {
  return (
    <div
      className={`border border-gray-300 shadow-xl rounded-lg overflow-hidden ${width}`}
    >
      <div className='relative bg-red-400 overflow-hidden'>
        <Image
          src={imageUrl}
          alt="Product Image"
          width={600}
          height={300}
          className="object-cover transition-transform duration-300 hover:scale-120"
        />
        <div className="absolute bottom-0 right-0 bg-blue-900 bg-opacity-50 rounded-tl-lg text-white p-2 text-sm">
          $ {price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      <div className='px-4 pb-4 pt-1 bg-gray-100'>
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-sm text-gray-600 h-10 line-clamp-2">{description}</p>
        <div className='flex w-full justify-between mt-4'>
          <Button
            onClick={onClickButtonLeft}
            label={labelButtonLeft}
            backgroundColor={BUTTON_BACKGROUND_COLORS.BLUE}
            icon={iconButtonLeft}
          />
          <Button
            onClick={onClickButtonRight}
            label={labelButtonRight}
            backgroundColor={BUTTON_BACKGROUND_COLORS.PURPLE}
            icon={iconButtonRight}
          />
        </div>
      </div>
    </div>
  );
};
