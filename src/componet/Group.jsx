import React from "react";

import { IoSearch } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { GroupListed } from "./InputField";
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
                      {GroupListed.map((content, index) => {
                        return (
                          <Group
                            key={content.id}
                            GroupBorder={
                              index === GroupListed.length - 1
                                ? "border-none"
                                : "border-b-2"
                            }
                            GroupHead={content.grouphead}
                            GroupText={content.grouptext}
                            GroupBtn={content.Btn}
                            GroupBtnDesing={"bg-transparent text-[#00000080]"}
                          />
                        );
                      })}
                    </div>
                  </div>
    </>
  );
};

export default Group;
