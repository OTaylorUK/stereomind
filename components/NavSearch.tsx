// components/Navbar.tsx
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from "react";


export const NavSearch = () => {

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: { target: { value: any; }; }) => {
    setSearchTerm(event.target.value);
  };

  const submitSearch = () => {
    if(searchTerm !== ""){
      router.push({
        pathname: "/search", query: {
          search: searchTerm
        }
      });
    }

  };

  const handleKeyDown = (event: { keyCode: any; }) => {
    const action = event.keyCode

    if (action === 13) {
      submitSearch()
    }
  };


  return (
    <div className="flex p-2  bg-slate-50">
      <button className="flex-1 px-3  " onClick={submitSearch}> <SearchIcon /></button>
      <input
        className="p-2 bg-transparent "
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
