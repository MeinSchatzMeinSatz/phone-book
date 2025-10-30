import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [isName, setIsName] = useState(true);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const nameInputRef = useRef(null);
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contactList);

  // 연락처 형식이 맞으면 연락처 리스트를 업데이트하는 함수
  function addNumber(e) {
    e.preventDefault();

    if (name.length === 0 || !validateName(name)) {
      setIsName(false);
      return;
    } else {
      setIsName(true);
    }

    if (phoneNumber.length === 0 || !validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumber(false);
      return;
    }

    dispatch({ type: "ADD_CONTACT", payload: { name, phoneNumber } });

    setName("");
    setPhoneNumber("");
    setIsName(true);
    setIsPhoneNumber(true);

    nameInputRef.current.focus();
  }

  function validateName(name) {
    const nameRegex = /^[a-zA-Z가-힣\s]+$/; // 한글, 영어, 공백만 허용
    return nameRegex.test(name);
  }

  function validatePhoneNumber(number) {
    const phoneRegex = /^\d{11}$/; // 10자리 또는 11자리 숫자만 허용
    return phoneRegex.test(number);
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
        <div>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            className="w-full border-1"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <p
            className={`text-[12px] text-[#ff0000] ${isName ? "sr-only" : ""}`}
          >
            이름을 넣어주세요.
          </p>
        </div>
        <label htmlFor="contact">Phone Number</label>
        <div>
          <input
            type="number"
            id="contact"
            className="w-full border-1"
            placeholder="전화번호를 입력해주세요"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <p
            className={`text-[12px] text-[#ff0000] ${
              isPhoneNumber ? "sr-only" : ""
            }`}
          >
            올바른 형식의 번호를 입력해주세요.
          </p>
        </div>
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
