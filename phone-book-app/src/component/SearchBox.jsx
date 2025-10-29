import React from "react";

const SearchBox = () => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input type="text" id="search" className="border-1" />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-[100px]"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
