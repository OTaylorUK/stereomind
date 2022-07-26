// components/ProductElement.tsx
import React from "react";

const styles = {
  card: "bg-white border",
  summary: "px-4 py-2 border-gray-100 bg-gray-50 border-t",
  description: 'flex justify-between items-center text-black',
  title: "block text-lg text-gray-900 truncate",
  category: "block text-sm font-medium text-gray-500",
  image: {
    aspect: "aspect-h-1 aspect-w-1",
    content: "object-center object-cover",
  },
};


import { Product } from "@/saleor/api";
import Image from "next/image";
import Link from "next/link";


type Props = Pick<Product, 'id' | 'name' | 'thumbnail' | 'category' | 'pricing'>;

export const ProductElement = ({ id, name, thumbnail, category, pricing }: Props) => {
  const lowestPrice = pricing?.priceRange?.start?.gross.amount ?? 0;
  const highestPrice = pricing?.priceRange?.stop?.gross.amount ?? 0;

  return (
    <li key={id} className={'flex flex-col  group  '}>
      <Link href={`/product/${id}`}>
        <a className="border flex-1 flex flex-col shadow-sm group-hover:shadow-xs group-hover:-translate-y-2 transition-transform  ">
          <div className={'relative overflow-hidden'}>
            <Image
              src={thumbnail!.url}
              alt="Picture of the author"
              layout="responsive"
              width={400}
              height={400}
            />
            <div className=" translate-y-full group-hover:translate-y-0 transition-transform  absolute bottom-0 right-0 p-4 text-xs z-20 text-white">£{lowestPrice == highestPrice ? highestPrice : `${lowestPrice} - £${highestPrice}`}</div>

            <div className="opacity-0 group-hover:opacity-80 transition-opacity absolute bottom-0 right-0 w-full h-full bg-black  z-10"></div>
          </div>
          

          <div className={'bg-slate-100 flex-1 flex flex-col p-4  justify-center  gap-2 '}>
            <p className={'text-sm'}>{name}</p>
            <p className={'text-xs text-slate-600'}>{category?.name}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
