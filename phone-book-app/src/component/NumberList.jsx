import React from "react";
import basicProfileImage from "../assets/img/기본프로필.jpeg";

const NumberList = () => {
  return (
    <div className="flex flex-col mt-3 gap-2">
      <h3>Number List</h3>

      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-3 bg-[#fff] rounded-[10px] p-2">
          <img
            src={basicProfileImage}
            alt="기본 프로필 이미지"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div>
            <h4 className="text-[20px]">이름</h4>
            <p className="text-[12px] text-[#808080]">연락처</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NumberList;
