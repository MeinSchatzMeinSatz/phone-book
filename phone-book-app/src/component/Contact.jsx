import React, { useEffect } from "react";
import basicProfileImage from "../assets/img/기본프로필.jpeg";
import deleteImage from "../assets/img/delete.jpeg";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const contactList = useSelector((state) =>
    state.filteredContacts.length > 0
      ? state.filteredContacts
      : state.contactList
  );

  function deleteContact(index) {
    dispatch({ type: "DELETE_CONTACT", payload: index });
  }

  useEffect(() => {}, [contactList]);

  if (!contactList) {
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
              className="flex justify-between items-center gap-3 bg-[#fff] rounded-[10px] p-2"
            >
              <div className="flex items-center gap-3 rounded-[10px] p-2">
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
              </div>
              <button
                onClick={() => {
                  deleteContact(index);
                }}
              >
                <img src={deleteImage} alt="삭제 이미지" className="w-5 h-5" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contact;
