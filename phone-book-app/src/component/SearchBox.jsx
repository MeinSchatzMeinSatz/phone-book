import React, { useState } from "react";

const SearchBox = () => {
  let [searchValue, setSearchValue] = useState("");

  function handleInputChange(e) {
    const searchValue = e.target.value;
  }

  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="text"
        id="search"
        className="border-1"
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded-md w-[100px]"
        onClick={() => {}}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
