// components/ProductDetails.tsx
import { useLocalStorage } from "react-use";

import {
  Product, useAddProductVariantToCartMutation
} from "@/saleor/api";
import Image from 'next/image';
import { useRouter } from "next/router";


import {
  VariantSelector
} from '@/components';

import { formatProductName } from 'lib/util';
import RichText from './RichText';


interface Props {
  product: Pick<Product, 'id' | 'name' | 'description' | 'thumbnail' | 'category' | 'media' | 'variants'>;
}

export const ProductDetail = ({ product }: Props) => {
  const router = useRouter();
  const [token] = useLocalStorage('token');
  const [addProductToCart] = useAddProductVariantToCartMutation();

  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;
  const selectedVariantID = queryVariant || product?.variants![0]!.id!;
  const selectedVariant = product.variants!.find((variant) => variant?.id === selectedVariantID) as any;

  const onAddToCart = async () => {

    await addProductToCart({
      variables: { checkoutToken: token, variantId: selectedVariantID },
    });
    router.push("/cart");
  };


  const niceName = formatProductName(selectedVariant?.name as string)
  const price = selectedVariant!.pricing.price.gross.amount


  return (
    <div className={'container px-4 py-10 flex flex-flow gap-6 items-start'}>
      <div className={'min-w-[20vw]  w-[20vw]'}>
        <Image
          src={product?.media![0]?.url}
          alt="Picture of the author"
          layout="responsive"
          width={300}
          height={300}
        />
      </div>

      <div className="flex-[2] flex flex-col gap-6 ">
        <div>
          <h1 className={'text-4xl font-bold tracking-tight text-gray-800'}>
            {product?.name}
          </h1>
          <p className={'text-lg mt-2 font-medium text-gray-500'}>
            {product?.category?.name}
          </p>
        </div>

        <article className={'text-base font-light text-slate-700'}>
          <RichText jsonStringData={product?.description} backupText={'Description coming soon!'} />
        </article>
        <VariantSelector variants={product?.variants || []} id={product.id} selectedVariantID={selectedVariantID} />

      </div>

      <div className="min-w-[20vw] w-[20vw] flex-col  bg-slate-100">
        <div className="w-full p-6 border border-slate-200 flex flex-row justify-between">
          <span className='text-lg font-bold'>{niceName}</span>
          <span className='text-lg font-bold'>£{price}</span>
        </div>
        <button
          onClick={onAddToCart}
          type="submit"
          className="w-full bg-black text-white p-4 hover:bg-red-400"
        >
          Add to cart
        </button>
      </div>

    </div>
  );
}
