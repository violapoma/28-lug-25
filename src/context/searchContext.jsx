import { createContext, useContext, useState } from "react";

const searchContext = createContext();

export function SearchProvider({children}) {

  //stato searchValue
  const [searchValue, setSearchValue] = useState("");
  //stato category
  const [category, setCategory] = useState("fantasy");
  //stato active per paginazione
  const [active, setActive] = useState(
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1
  );

  return (
    <searchContext.Provider value = { {searchValue, setSearchValue, category, setCategory, active, setActive} }>
      {children}
    </searchContext.Provider>
  )
}

export function useSearchValue() {
  return useContext(searchContext); 
}