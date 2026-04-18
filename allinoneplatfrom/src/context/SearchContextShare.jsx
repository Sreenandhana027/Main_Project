import { createContext, useState } from "react";

export const searchContext = createContext();

function SearchContextShare({ children }) {
  const [searchKey, setSearchKey] = useState("");
  const [locationKey, setLocationKey] = useState("");

  return (
    <searchContext.Provider
      value={{ searchKey, setSearchKey, locationKey, setLocationKey }}
    >
      {children}
    </searchContext.Provider>
  );
}

export default SearchContextShare;
