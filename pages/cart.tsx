// pages/cart.tsx
import React from "react";
import { useLocalStorage } from 'react-use';

import {
  Layout,
  CartHeader,
  CartList,
  CartSummary
} from "@/components";

import { useCheckoutByTokenQuery } from "@/saleor/api";
import Loader from "@/components/Loader";

const styles = {
  grid: 'grid grid-cols-3 gap-8',
}

const Cart = () => {

  const [token] = useLocalStorage('token');
  const { data, loading, error } = useCheckoutByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
  });

  if (loading) return <Loader />
  if (error) return <Loader />
  if (!data || !data.checkout) return null;

  const products = data.checkout?.lines || [];



  return (
    <Layout>

      <div className="container flex flex-col gap-14">
        <CartHeader />

        <div className="flex flex-col">

        <h1 className={'text-1xl font-medium tracking-tight text-gray-800'}>Cart Summary</h1>

            <CartList products={products} />
        </div>

      </div>

    </Layout>
  );
};

export default Cart;
