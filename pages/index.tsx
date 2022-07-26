// pages/index.tsx
import { Layout } from "@/components";
import React from "react";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loader from "@/components/Loader";

const ProductCollection = dynamic<any>(() => import('../components/ProductCollection'), {
  suspense: true,
})


const Home = () => {
  return (
    <Layout>
       <Suspense fallback={<Loader/>}>
        <ProductCollection perPage={20} />
      </Suspense>
    </Layout>
  );
};

export default Home;
