// components/ProductCollection.tsx
import React, { useEffect, useState } from "react";

import { OrderDirection, Product, ProductCollectionQueryVariables, ProductFilterInput, ProductOrderField, useProductCollectionQuery } from "@/saleor/api";
import { Pagination, ProductElement } from "@/components";
import { mapEdgesToItems } from "lib/util";
import Loader from "./Loader";


export interface ProductCollectionProps {
  categoryID?: any;
  allowMore?: boolean;
  perPage?: number;
  search?: string;
  setCounter?: (value: number) => void;
}


const ProductCollection = ({ categoryID,
  search = "",
  setCounter,
  allowMore = true,
  perPage = 8}:ProductCollectionProps): JSX.Element => {
  
  
  const [productsFilter, setProductsFilter] = useState<ProductFilterInput>({
    categories: [categoryID]
  });

  const [hasMounted, setHasMounted] = useState(false)


  useEffect(() => {

    const filters = {
      categories: categoryID ? [categoryID] : [],
      search: search ? search : ""
    }

    setProductsFilter(filters)
    setHasMounted(true)
  }, [categoryID, search]);

  

  console.log({productsFilter});
  

  const variables: ProductCollectionQueryVariables = {
    filter: productsFilter,
    first: perPage,
  }
  const { loading, error, data, fetchMore, refetch } = useProductCollectionQuery({
    variables
  });

  useEffect(()=>{
    
    refetch({ filter: productsFilter })

  },[productsFilter, refetch, categoryID])

  if (loading || !hasMounted) return <Loader/>
  if (error) return <Loader/>

  const onLoadMore = () => {
    fetchMore({
      variables: {
        after: data?.products?.pageInfo.endCursor,
      },
    });
  };

  const products = mapEdgesToItems(data?.products);
  if (products.length === 0) {
    return (
      <div>no results</div>
    );
  }

  const pageInfo = data?.products?.pageInfo;
  const totalCount = data?.products?.totalCount;



  
  if (data) {
   
    return (
      <>
        <ul role="list" className={' container grid gap-4 grid-cols-4'}>
          {products?.length > 0 &&
            products.map((product) => (
              <ProductElement key={product.id} {...(product as Product)} />
            ))}
        </ul>
        {pageInfo?.hasNextPage && (
          <Pagination
            onLoadMore={onLoadMore}
            itemCount={products.length}
            totalCount={totalCount || NaN}
          />
        )}
        
      </>
    );
  }

  return (
    <div>...</div>
  );
};


export default ProductCollection