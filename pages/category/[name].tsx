// pages/product/[id].tsx
import {
  useProductByIdQuery,
  ProductCollectionDocument,
  ProductCollectionQuery,
  Product,
  FetchAllCategoriesQuery,
  FetchAllCategoriesDocument,
} from "@/saleor/api";
import { GetStaticProps } from "next";
import {
  Layout,
  ProductCollection,
  ProductDetails,
} from '@/components';

// import { ApolloClient } from "@apollo/client";
import { apolloClient } from "@/lib";
import { mapEdgesToItems } from "lib/util";
import { gql, useQuery } from '@apollo/client';
import { useEffect } from "react";

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
  category:  any
  test:  any
}

const GET_DOG_PHOTO = gql`
  query ProductCollection($first: Int = 20, $filter: ProductFilterInput) {
  products(first: $first, channel: "default-channel", filter: $filter) {
    edges {
      node {
        id
        name
        description

        thumbnail {
          url
        }
        category {
          name
        }
        pricing {
          priceRange {
            start {
              gross {
                amount
              }
            }
            stop {
              gross {
                amount
              }
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
`

const ProductPage = ({ category }: Props) => {

    return (
      <Layout>
        <ProductCollection categoryID={category.id}/>
      </Layout>
    );

}

export default ProductPage;


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<FetchAllCategoriesQuery>({
    query: FetchAllCategoriesDocument,
  });

  const categories = mapEdgesToItems(data?.categories);
  const filtered:any = categories.filter((category: any) => category.name.toLowerCase() === params?.name)
  const categoryID = filtered?.[0]?.id
  const categoryName = filtered?.[0]?.name

  
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
    params: { name: `${name.toLowerCase()}`}
  }));

  return {
    paths,
    fallback: true,
  };
}
