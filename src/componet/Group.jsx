import React from "react";

import { IoSearch } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
const Group = ({
  GroupHead,
  GroupText,
  GroupBtn,
  GroupBtnDesing,
  GroupBorder,
  User,
}) => {
  return (
    <>
      <div
        className={`${GroupBorder} flex justify-center items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]`}
      >
        <div className="w-[70px] h-[70px] rounded-full border flex justify-center items-center">
          <span className="text-5xl">
            <FaUserTie />
          </span>
          
        </div>
        <div className={`${User} pl-[14px] pr-[52px] `}>
          <h4 className="text-[18px] font-semibold font-poppins text-black  ">
            {GroupHead}
          </h4>
          <p className="text-[14px] font-medium font-poppins text-[rgba(77,77,77,0.75)]">
            {GroupText}
          </p>
        </div>
        <div
          className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl ${GroupBtnDesing}`}
        >
          {GroupBtn}
        </div>
      </div>
    </>
  );
};

export default Group;
