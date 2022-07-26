// components/Navbar.tsx
import { NavBasket, NavSearch } from "@/components";
import { useFetchAllCategoriesQuery } from "@/saleor/api";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from 'react-use';
import { NavBarLinks } from "./NavBarLinks";


export const Navbar = () => {

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




  return (
    <div className={'bg-gray-100 border-b shadow-sm fixed top-0 left-0  z-50 w-full   flex flex-col items-center'}>
      <NavBasket />

      <div className={'h-20 flex justify-between items-center container '}>




      <Link  href="/">
          <a aria-expanded="false">
          <Image
          src={'/steromindlogo.png'}
          alt={"steromind logo"}
          layout="fixed"
          width={200}
          height={45}
        />  
          </a>
      </Link>
      
        <NavBarLinks links={formattedCats} />
        <NavSearch />
      </div>

    </div>
  );
};
