'use client'

import React from 'react';
import { Wrapper } from '@fernando_neirot2/ui';
import type { Product, ProductCardActions } from '../types';

export interface ProductGridProps {
  products: Product[];
  actions?: ProductCardActions;
  className?: string;
  flexDirection?: 'row' | 'column';
}

export function ProductGrid({ products, actions, className, flexDirection = 'column' }: ProductGridProps) {

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {products.map(product => {
        const firstAction = actions?.first;
        const secondAction = actions?.second;
        const thirdAction = actions?.third;
        return (
          <Wrapper.ProductCard
            key={product.id}
            onClickButtonFirst={firstAction && typeof firstAction.onClick === 'function' ? () => firstAction.onClick!(product.id) : undefined}
            iconButtonFirst={firstAction?.icon as any}
            labelButtonFirst={firstAction?.label}
            tootlipButtonFirst={firstAction?.tooltip}
            bgButtonFirst={firstAction?.backgroundColor as any}

            onClickButtonSecond={secondAction && typeof secondAction.onClick === 'function' ? () => secondAction.onClick!(product.id) : undefined}
            labelButtonSecond={secondAction?.label}
            iconButtonSecond={secondAction?.icon as any}
            tootlipButtonSecond={secondAction?.tooltip}
            bgButtonSecond={secondAction?.backgroundColor as any}

            onClickButtonThird={thirdAction && typeof thirdAction.onClick === 'function' ? () => thirdAction.onClick!(product.id) : undefined}
            iconButtonThird={thirdAction?.icon as any}
            tootlipButtonThird={thirdAction?.tooltip}
            labelButtonThird={thirdAction?.label}
            bgButtonThird={thirdAction?.backgroundColor as any}


            imageUrl={product.imageUrl || undefined}
            width="full"
            height={200}
            price={product.price}
            title={product.title}
            description={product.description}
            flexDirection={flexDirection}
            sizeButton="default"
          />
        );
      })}
    </div>
  );
}
