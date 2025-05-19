import React, { useEffect, useState } from "react";
import { HiDotsVertical, HiOutlineDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  off,
  push,
  set,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const BlockList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [blockUserList, setblockUserList] = useState([]);

  

  useEffect(() => {
    const fatchdata = () => {
      const UserRef = ref(db, "block/");
      onValue(UserRef, (snapshot) => {
        let BlockList = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid !== item.val().senderId &&
            item
              .val()
              .senderReciverUid.includes(
                auth.currentUser.uid.concat(item.val().senderId)
              )
          ) {
            BlockList.push({ ...item.val(), BlockKey: item.key });
          }
        });
        setblockUserList(BlockList);
      });
    };
    fatchdata();

    // clean up function
    return () => {
      const UserRef = ref(db, "block/");
      off(UserRef);
    };
  }, []);
//   console.log(blockUserList);
  
  /**
   * todo: handleBlock function implement
   * @peram
   * return voit
   */
  const handleBlock = (blockedUser) => {
    console.log("from handleblock", blockedUser);

    set(push(ref(db, "Friends/")), {
   
  ...blockedUser,
  senderReciverUid: auth.currentUser.uid.concat(blockedUser.senderId),
    })
    .then(() => {
       const dbref = ref(db, `block/${blockedUser.BlockKey}`);
    remove(dbref);
    });
   
  };
  return (
    <>
      {/* <div className="p-5 h-[100%]">
        <div className="h-[15%] flex justify-between items-center">
          <h2 className="text-lg font-semibold">Blocked Users</h2>
          <span className="text-blueColor text-[20px] cursor-pointer">
            <HiOutlineDotsVertical />
          </span>
        </div>
        <div className="h-[85%] overflow-auto [&::-webkit-scrollbar]:hidden">
          {
            blockUserList.map((BlockUser) => (
              <div
                key={BlockUser.senderUserKey}
                className="flex items-center gap-4 py-3 border-b border-b-gray-300 last:border-b-0 "
              >
                <img
                  src={BlockUser.senderprofile_picture                  }
                  alt={BlockUser.senderUserName}
                  className="w-12 h-12 rounded-full object-cover "
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {BlockUser.senderUsename}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {moment(BlockUser.createAt).fromNow()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleBlock(BlockUser);
                  }}
                  className="bg-blueColor mr-3 text-white px-4 py-1 rounded-lg font-semibold cursor-pointer"
                >
                  unblock
                </button>
              </div>
            ))}
          
        </div>
      </div> */}
      <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
                          <div className="flex justify-between items-center ">
                            <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
                            Blocked Users
                            </h3>
                            <span className="text-bandColor text-2xl">
                              <HiDotsVertical />
                            </span>
                          </div>
                          <div className="h-[374px] overflow-scroll">
                            {blockUserList.map((item, index) => {
                              return (
                               <div key={index}
                                  className= {
                                    blockUserList?.length - 1 === index?"flex justify-between items-center pt-[14px] pb-[10px]":"flex justify-between items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]"
                                    } >
                                 <div className="flex justify-start items-center gap-3">
                                 <div className="w-[70px] h-[70px] rounded-full border flex justify-center items-center">
                                    <picture>
                                      <img
                                        src={item.senderprofile_picture}
                                        className="w-full h-full object-cover rounded-full"
                                        alt=""
                                      />
                                    </picture>
                                  </div>
                                  <div className={` pl-[14px] pr-[52px] `}>
                                    <h4 className="text-[18px] font-semibold font-poppins text-black  ">
                                      {item.senderUsename                          }
                                    </h4>
                                    <p className="text-[14px] font-medium font-poppins text-[rgba(77,77,77,0.75)]">
                                    {moment(item.createdAt).fromNow()}
                                    </p>
                                  </div>
                                 </div>
                                <button
                                  onClick={() => handleBlock(item)}
                                    className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                                  >
                                    UnBlock
                                  </button>
                                
                                </div>
                              );
                            })}
                          </div>
                        </div>
    </>
  );
};

export default BlockList;
