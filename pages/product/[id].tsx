// pages/product/[id].tsx
import {
    useProductByIdQuery,
    ProductCollectionDocument,
    ProductCollectionQuery,
    Product,
    ProductCollectionQueryVariables,
    useProductCollectionQuery
  } from "@/saleor/api";
  import { GetStaticProps } from "next";
  
  import {
    Layout,
    ProductDetails,
  } from '@/components';
  
// import { ApolloClient } from "@apollo/client";
import { apolloClient } from "@/lib";
import Loader from "@/components/Loader";
  
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
  
  interface Props {
    id: string;
  }
  
  const ProductPage = ({ id }: Props) => {
    const { loading, error, data } = useProductByIdQuery({ variables: { id } });

 

  
    if (loading) return <Loader/>
    if (error ) return <Loader/>


    
  
    if (data) {
      const { product } = data;
  
      console.log({product});
      
      return (
        <Layout>
          <ProductDetails product={product as Product} />
        </Layout>
      );
    }
  
    return null;
  }
  
export default ProductPage;


export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
      props: {
        id: params?.id,
      },
    };
  };

  
  
export async function getStaticPaths() {
    const { data } = await apolloClient.query<ProductCollectionQuery>({
        query: ProductCollectionDocument,
        variables: {
          
        }
      });
      const paths = data.products?.edges.map(({ node: { id } }) => ({
        params: { id },
      }));
    
      return {
        paths,
        fallback: true,
      };
    
  }
  