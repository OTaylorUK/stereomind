// pages/product/[id].tsx
import {
  Layout,
} from '@/components';
import {
  FetchAllCategoriesDocument, FetchAllCategoriesQuery
} from "@/saleor/api";
import { GetStaticProps } from "next";

// import { ApolloClient } from "@apollo/client";
import { apolloClient } from "@/lib";
import { mapEdgesToItems } from "lib/util";
import ProductCollection from '@/components/ProductCollection';


interface Props {
  category: any
  test: any
}


const ProductPage = ({ category }: Props) => {


  if(category?.id === null){
    return null
  }
  return (
    <Layout>
      <ProductCollection categoryID={category?.id} />
    </Layout>
  );

}

export default ProductPage;


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<FetchAllCategoriesQuery>({
    query: FetchAllCategoriesDocument,
  });

  const categories = mapEdgesToItems(data?.categories);
  const filtered: any = categories.filter((category: any) => category.name.toLowerCase() === params?.name)
  const categoryID = filtered?.[0]?.id ? filtered?.[0]?.id : null
  const categoryName = filtered?.[0]?.name ? filtered?.[0]?.name : null


  return {
    props: {
      name: params?.name,
      category: {
        id: categoryID,
        name: categoryName,
      }
    },
  };
};



export async function getStaticPaths() {
  const { data } = await apolloClient.query<FetchAllCategoriesQuery>({
    query: FetchAllCategoriesDocument,
  });

  const paths = data?.categories?.edges.map(({ node: { name } }) => ({
    params: { name: `${name.toLowerCase()}` }
  }));

  return {
    paths,
    fallback: false,
  };
}
