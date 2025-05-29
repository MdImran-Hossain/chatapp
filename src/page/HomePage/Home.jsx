import React from "react";
import { IoSearch } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import Group from "../../componet/Group";
import UserList from "../../componet/UserList";
import FriendRequest from "../../componet/FriendRequest";
import Friend from "../../componet/Friend";
import BlockList from "../../componet/BlockList";
import GroupList from "../../componet/GroupList";
import { GroupListed } from "../../componet/InputField";
import { FaUserTie } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="w-[427px] h-[60px] mb-[43px] relative">
            <span className="top-[50%] absolute left-[20px] translate-y-[-50%] text-[19px]">
              <IoSearch />
            </span>
            <input
              type="text"
              className="w-[427px] h-[60px] text-[16px] font-medium pl-[60px] font-poppins shadow-2xl rounded-2xl p-5 placeholder:pl-[30px]"
              placeholder="Search"
            />
            <span className="top-[50%] absolute right-[20px] translate-y-[-50%] text-bandColor text-2xl">
              <HiDotsVertical />
            </span>
          </div>
          <GroupList />
        </div>
        
        <div>
          <Friend />
        </div>
            <div>
              <UserList />
            </div>
            <div>
              <FriendRequest />
            </div>
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
                <div>
                  {
                    <BlockList />
                  }
                </div>
      </div>
    </>
  );
};

export default Home;
