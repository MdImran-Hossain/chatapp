import React from "react";

import { IoSearch } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { GroupListed } from "./InputField";
const Group = () => {
  return (
    <>
      <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
                    <div className="flex justify-between items-center ">
                      <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
                      Group
                      </h3>
                      <span className="text-bandColor text-2xl">
                        <HiDotsVertical />
                      </span>
                    </div>
                    <div>
                     {GroupListed.map((content, index) => (
                                   <div
                                     key={index}
                                     className={
                                       GroupListed?.length - 1 === index
                                         ? "flex justify-between items-center pt-[14px] pb-[10px]"
                                         : "flex justify-between items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]"
                                     }
                                   >
                                     <div className="w-[70px] h-[70px] rounded-full border flex justify-center items-center">
                                       <span className="text-5xl">
                                         <FaUserTie />
                                       </span>
                                     </div>
                                     <div className="pl-[14px] pr-[52px]">
                                       <h4 className="text-[18px] font-semibold font-poppins text-black">
                                         {content.grouphead}
                                       </h4>
                                       <p className="text-[14px] font-medium font-poppins text-[rgba(77,77,77,0.75)]">
                                         {content.grouptext}
                                       </p>
                                     </div>
                                     <div className="px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl">
                                       {content.Btn}
                                     </div>
                                   </div>
                                 ))}
                    </div>
                  </div>
    </>
  );
};

export default Group;
