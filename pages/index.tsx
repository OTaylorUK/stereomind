// pages/index.tsx
import { Layout, ProductCollection } from "@/components";
import React from "react";


const Home = () => {
  return (
    <Layout>
      <ProductCollection perPage={20} />
    </Layout>
  );
};

export default Home;
