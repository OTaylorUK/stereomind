// components/ProductDetails.tsx

import {
  Product,
  ProductCollectionQueryVariables,
  useProductCollectionQuery
} from "@/saleor/api";

const styles = {
  columns: 'grid grid-cols-2 gap-x-10 items-start',
  image: {
    aspect: 'aspect-w-1 aspect-h-1 bg-white rounded',
    content: 'object-center object-cover'
  },
  details: {
    title: 'text-4xl font-bold tracking-tight text-gray-800',
    category: 'text-lg mt-2 font-medium text-gray-500',
    description: 'prose lg:prose-s'
  }
}

import {
  ProductDetail,
  ProductCollection
} from '@/components';

import Loader from './Loader';


interface Props {
  product: Pick<Product, 'id' | 'name' | 'description' | 'thumbnail' | 'category' | 'media' | 'variants'>;
}

export const ProductDetails = ({ product }: Props) => {



  // const variables: ProductCollectionQueryVariables = {
  //   filter: { search: product?.name },
  //   first: 8,
  // }
  // const { loading, error, data, refetch } = useProductCollectionQuery({
  //   variables
  // });


  // if (loading) return <Loader />
  // if (error) return <Loader />

  const searchName = product?.name.split(' ')?.[0].toLowerCase()
  
  return (
    <>
      <div className={'container px-4 py-10 flex flex-col gap-6 items-start'}>
        <ProductDetail product={product as Product} />

      </div>
      <div className="w-full flex flex-col justify-center items-center gap-20 bg-slate-50 p-20">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Our recommendations</h2>
        <ProductCollection search={searchName} perPage={8} />
      </div>
    </>
  );
}
