import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, off, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../Skeleton/UserSkeleton";
import { HiDotsVertical } from 'react-icons/hi';
import moment from 'moment';
import { timeSet } from './InputField';
const Friend = () => {

const auth = getAuth();
    const db = getDatabase();
    const [friend,setfriend]=useState([])

    useEffect(() => {
        const fetchData = () => {
        //   setloading(true);
          const UserRef = ref(db, "Friends/");
          onValue(UserRef, (snapshot) => {
            let friendList = [];
            snapshot.forEach((item) => {
                if(auth.currentUser.uid !== item.val().senderUid){
                    friendList.push({...item.val(), FRKey: item.key})
                }
                 
                
                
                
                
            });
            setfriend(friendList);
    
    
          });
        };
        fetchData();
        return () => {
          const requestRef = ref(db, "friendRequest/");
          off(requestRef);
        };
    
      }, []);

// handleBlock funtion implement
const handleBlock = (frd) => {
  
  console.log("block user key", frd.FRKey);
  const check = confirm("are you Sure");

  if (!check) {
    return;
  }

  set(push(ref(db, "block/")), {
    ...frd,
    createdAt: timeSet()
  })
    .then(() => {
      const frdRef = ref(db, `Friends/${frd.FRKey}`);
      remove(frdRef);
      
    })
    .catch((err) => {
      console.error("error from handleBlock funtion", err);
    });
};
//  console.log(friend);
 

  return (
    <>
      <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
                    <div className="flex justify-between items-center ">
                      <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
                        Friend Request
                      </h3>
                      <span className="text-bandColor text-2xl">
                        <HiDotsVertical />
                      </span>
                    </div>
                    <div className="h-[374px] overflow-scroll">
                      {friend.map((item, index) => {
                        return (
                         <div key={index}
                            className= {
                              friend?.length - 1 === index?"flex justify-between items-center pt-[14px] pb-[10px]":"flex justify-between items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]"
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
                              Block
                            </button>
                          
                          </div>
                        );
                      })}
                    </div>
                  </div>
    </>
  )
}

export default Friend
