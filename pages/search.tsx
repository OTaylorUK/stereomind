// pages/cart.tsx

import {
  Layout
} from "@/components";
import ProductCollection from "@/components/ProductCollection";

import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();

  const search= router.query?.search;


  if(!search && typeof search === undefined){
    return(
      <div>No results please try again</div>
    )
  }

  return (
    <Layout>
      <div className="w-full flex flex-col gap-14 justify-center items-center">
        
      <h1 className="text-4xl font-bold tracking-tight text-gray-800">Search results for &ldquo;{search}&rdquo;</h1>
      <ProductCollection search={search as string} perPage={8} />
      </div>

    </Layout>
  );
};

export default Search;
