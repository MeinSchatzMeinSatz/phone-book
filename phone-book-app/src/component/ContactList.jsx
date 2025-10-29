import React from "react";
import SearchBox from "./SearchBox.jsx";
import NumberList from "./NumberList.jsx";

const ContactList = () => {
  return (
    <div className="flex flex-col bg-gray-300 rounded-[30px] p-[20px] ml-5 w-[400px]">
      <h2 className="sr-only">ContactList</h2>
      <SearchBox />
      <NumberList />
    </div>
  );
};

export default ContactList;
