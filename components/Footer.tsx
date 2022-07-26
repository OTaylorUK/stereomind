// components/Navbar.tsx
import { CheckoutLineDetailsFragmentFragment, useCheckoutByTokenQuery, useFetchAllCategoriesQuery } from "@/saleor/api";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from "next/link";
import { useLocalStorage } from 'react-use';
import { NavBarLinks } from "./NavBarLinks";

export const Footer = () => {

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
    <div className={'bg-black text-white border-b shadow-sm   z-50 w-full h-[20vh]  flex justify-center items-center '}>
      <div className="container flex justify-center items-center">

      <div className={'flex-1 flex  justify-between container '}>
        <NavBarLinks links={formattedCats} btnColours={'text-white hover:text-red-400'}/>
      </div>

      <Link  href="https://www.ollie-taylor.uk/">
          <a className={`font-light hover:underline hover:text-red-300   z-10 flex items-center text-sm`} aria-expanded="false">
          Built by Ollie Taylor
          </a>
      </Link>

        
      </div>

    </div>
  );
};
