// components/VariantSelector.tsx
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { ProductVariant } from '@/saleor/api'
import { formatProductName } from 'lib/util';

type Variant = Pick<ProductVariant, "id" | "name" | "pricing"> | null | undefined | any;


interface Props {
  id: string;
  selectedVariantID: string;
  variants: Variant[];
}


export const VariantSelector = ({ variants, id, selectedVariantID }: Props) => {

    
  return (
    <div className={'flex flex-flow gap-4 flex-wrap'}>
      {variants.map((variant) => {
        const isSelected = variant?.id === selectedVariantID;

        const price = variant?.pricing.price.gross.amount
        
        const niceName = formatProductName(variant?.name)

        const content = `${niceName} £${price}`
        return (
          <Link
            key={variant?.name}
            href={{
              pathname: "/product/[id]",
              query: { variant: variant?.id, id },
            }}
            replace
            shallow
          >
            <a className={ `capitalize flex gap-2 items-center font-bold flex-flow justify-center border py-4 px-6 border-slate-200 hover:bg-blue-100 hover:border-black ${isSelected? 'border-blue-500 bg-blue-100' : ''}`}>
              {niceName}
              <span className=''>£{price}</span>
            </a>
          </Link>
        );
      })}
    </div>    
  );
}
