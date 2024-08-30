import { useState } from "react";
import { Search as SearchIcon } from "react-feather";

const Search = ({ onSearch, placeholder = "Search" }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full py-2 pl-2 pr-4 text-sm text-gray-200 bg-white/10 backdrop-blur-md rounded-md focus:outline-none"
      />
      <div className="absolute inset-y-0 left-[90%] flex items-center">
        <SearchIcon className="size-5 text-gray-500" />
      </div>
    </div>
  );
};

export default Search;
