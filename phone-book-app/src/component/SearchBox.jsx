import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const dispatch = useDispatch();

  function handleInputChange(e) {
    dispatch({
      type: "SEARCH_VALUE",
      payload: { searchValue: e.target.value },
    });
    dispatch({
      type: "SEARCH_CONTACT",
      payload: { searchValue: e.target.value },
    });
  }

  return (
    <div className="flex items-center gap-3 p-3">
      <label htmlFor="search">연락처를 검색해보세요</label>
      <input
        type="text"
        id="search"
        className="border-1"
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
    </div>
  );
};

export default SearchBox;
