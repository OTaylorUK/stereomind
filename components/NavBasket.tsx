// components/Navbar.tsx
import { CheckoutLineDetailsFragmentFragment, useCheckoutByTokenQuery, useFetchAllCategoriesQuery } from "@/saleor/api";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from "next/link";
import { useLocalStorage } from 'react-use';

export const NavBasket = () => {

  const { data: allCategories } = useFetchAllCategoriesQuery()


  const formattedCats = [
    { link: '/', label: 'All Products' }
  ]
  allCategories?.categories?.edges.map(({ node }) => {
    formattedCats.push({
      link: `/category/${node.name.toLowerCase()}`,
      label: node.name,
    })
  })
  // console.log({allCategories});

  const [token] = useLocalStorage('token');
  const { data, loading, error } = useCheckoutByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
  });


  const counter =
    data?.checkout?.lines?.reduce(
      (amount: number, line?: CheckoutLineDetailsFragmentFragment | null) =>
        line ? amount + line.quantity : amount,
      0
    ) || 0;


  return (
    <div className=" flex w-full bg-black justify-center p-2 ">
      <div className="container flex justify-end">
        <Link href={'/cart'}>
          <a className="flex gap-1 justify-center items-center text-white group" aria-expanded="false">
            <ShoppingBagIcon fontSize="small" className="group-hover:text-red-400" />
            <span className="text-sm group-hover:text-red-400" >{counter}</span>
          </a>
        </Link>
      </div>

    </div>

  );
};
