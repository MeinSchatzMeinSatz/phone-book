import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const dispatch = useDispatch();

  function addNumber(e) {
    e.preventDefault();
    dispatch({ type: "ADD_CONTACT", payload: { name, phoneNumber } });
  }

  return (
    <div className="bg-gray-300 rounded-[30px] p-[20px]">
      <h2 className="sr-only">ContactForm 입니다.</h2>
      <form
        action="submit"
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          addNumber(e);
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="w-full border-1"
          placeholder="이름을 입력해주세요"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="contact">Phone Number</label>
        <input
          type="number"
          id="contact"
          className="w-full border-1"
          placeholder="전화번호를 입력해주세요"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-[100px] mt-3"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
