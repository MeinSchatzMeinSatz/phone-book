import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  let [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch({ type: "SEARCH_CONTACT", payload: { searchValue } });
  }

  return (
    <>
      <form
        action="submit"
        onSubmit={(e) => handleSearch(e)}
        className="flex items-center gap-3 p-3"
      >
        <input
          type="text"
          id="search"
          className="border-1"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button
          type="submin"
          className="bg-blue-500 text-white p-2 rounded-md w-[100px] hover:bg-blue-700"
          onClick={() => {
            dispatch({ type: "SEARCH_CONTACT", payload: { searchValue } });
          }}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBox;
