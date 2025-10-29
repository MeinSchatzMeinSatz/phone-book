import React from "react";

const ContactForm = () => {
  return (
    <div className="bg-gray-300 rounded-[30px] p-[20px]">
      <h2 className="sr-only">ContactForm 입니다.</h2>
      <form action="submit" className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="w-full border-1"
          placeholder="이름을 입력해주세요"
        />
        <label htmlFor="contact">Phone Number</label>
        <input
          type="number"
          id="contact"
          className="w-full border-1"
          placeholder="전화번호를 입력해주세요"
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
