// components/CartList.tsx
import Link from 'next/link';

interface Props {
  products: any[];
}

import {
  useRemoveProductFromCheckoutMutation
} from "@/saleor/api";

import Image from 'next/image';
import { useLocalStorage } from 'react-use';

const styles = {
  product: {
    image: 'flex-shrink-0 bg-white w-48 h-48 border object-center object-cover',
    container: 'ml-8 flex-1 flex flex-col justify-center',
    name: 'text-xl font-bold',
  }
}
export const CartList = ({ products }: Props) => {
  const [token] = useLocalStorage("token");
  const [removeProductFromCheckout] = useRemoveProductFromCheckoutMutation();

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {products.map((line) => {
        const lineID = line?.id || "";
        const variant = line?.variant;
        const product = line?.variant.product;
        const price = line?.totalPrice?.gross;
        const productID = product?.id

        console.log({line});
        
        return (
          <li key={line?.id} className="py-6 flex">
            <div className={styles.product.image}>

              <Image
                src={product?.thumbnail?.url || ""}
                alt={product?.thumbnail?.alt || ""}
                layout="responsive"
                width={300}
                height={300}
              />

            </div>

            <div className={styles.product.container}>
              <div className="flex items-center justify-between">
                <div className="pr-6">
                  <h3 className={styles.product.name}>
                    <Link href={`/product/${productID}`}>
                      <a>
                        {product?.name}
                      </a>
                    </Link>
                  </h3>
                  <h4>
                    {variant?.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      removeProductFromCheckout({
                        variables: {
                          checkoutToken: token,
                          lineId: lineID,
                        },
                      })
                    }
                    className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                  >
                    <span>Remove</span>
                  </button>
                </div>

                <div className="p-4 border border-slate-200 flex flex-row justify-between">
                  <span className='text-lg font-bold'>£{price?.amount}</span>
                </div>
             
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
