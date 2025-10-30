import React from "react";
import basicProfileImage from "../assets/img/기본프로필.jpeg";
import { useSelector } from "react-redux";

const Contact = () => {
  const contactList = useSelector((state) =>
    state.filteredContacts.length > 0
      ? state.filteredContacts
      : state.contactList
  );

  if (contactList.length === 0) {
    return <div>등록된 연락처가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col mt-3 gap-2">
      <h3>Number List</h3>

      <ul className="flex flex-col gap-2">
        {contactList.map((contact, index) => {
          return (
            <li
              key={index}
              className="flex items-center gap-3 bg-[#fff] rounded-[10px] p-2"
            >
              <img
                src={basicProfileImage}
                alt="기본 프로필 이미지"
                className="w-[40px] h-[40px] rounded-full"
              />
              <div>
                <h4 className="text-[20px]">{contact.name}</h4>
                <p className="text-[12px] text-[#808080]">
                  {contact.phoneNumber}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contact;
