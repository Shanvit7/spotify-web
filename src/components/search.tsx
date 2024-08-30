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
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full py-2 pl-2 pr-4 text-sm text-gray-200 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <div className="absolute inset-y-0 left-[90%] flex items-center">
        <SearchIcon className="size-5 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
