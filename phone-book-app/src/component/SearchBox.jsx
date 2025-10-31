import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../utils/useSearchDebounce";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearch = useDebounce((searchValue) => {
    dispatch({
      type: "SEARCH_CONTACT",
      payload: { searchValue: searchValue },
    });
  }, 300);

  return (
    <div className="flex items-center gap-3 p-3">
      <label htmlFor="search">연락처를 검색해보세요</label>
      <input
        type="text"
        id="search"
        className="border-1"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;
