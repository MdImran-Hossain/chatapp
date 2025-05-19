import React, { useEffect, useState } from 'react'

import { getDatabase, ref, onValue, push, off, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../Skeleton/UserSkeleton";
import { HiDotsVertical } from 'react-icons/hi';
import moment from 'moment';
import { SucessToast, timeSet } from './InputField';
const FriendRequest = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [FRrequst,setFRrequst]=useState([])
    // -------------- data fetch from friendrequest database
  useEffect(() => {
    const fetchData = () => {
    //   setloading(true);
      const UserRef = ref(db, "friendRequest/");
      onValue(UserRef, (snapshot) => {
        let FRrequstList = [];
        snapshot.forEach((item) => {
            if(auth.currentUser.uid !== item.val().senderUid){
              FRrequstList.push({...item.val(), FRKey: item.key})
            }
             
            
            
            
            
        });
        setFRrequst(FRrequstList);


      });
    };
    fetchData();
    return () => {
      const requestRef = ref(db, "friendRequest/");
      off(requestRef);
    };

  }, []);

// ------------------------- friendRequest Acpect 
const handleFriendRequest=(item)=>{
set(push(ref(db, "Friends/")), {
  ...item,
  senderReciverUid: auth.currentUser.uid.concat(item.senderId),
  createdAt: timeSet()
}).then(()=>{
  set(push(ref(db, "notificaton/")), {
              notificationMsg: `${auth.currentUser.username} Acpect your friend request `,
              senderprofile_picture: auth.currentUser.photoURL,
              createdAt: timeSet(),
            });
}).then(()=>{
  SucessToast(
              `${auth.currentUser.username} accpet the friend request `,
              "top-center"
            );
}).then(()=>{
  const dbref = ref(db, `friendRequest/${item.friendRuquestUid}`);
        remove(dbref);
}).catch(() => {
  console.error("error from sending friend request");
});

}
// ------ friend request reject

const handleReject = (item) => {
  const areYouSure = confirm("Are you sure you want to reject");
  const dbref = ref(db, `friendRequest/${item.friendRuquestUid}`);
  remove(dbref);
};

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
                {FRrequst.map((item, index) => {
                  return (
                   <div key={index}
                      className= {
                        FRrequst?.length - 1 === index?"flex justify-between items-center pt-[14px] pb-[10px]":"flex justify-between items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]"
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
                    <div className='flex gap-1.5'>
                    <button
                      onClick={() => handleFriendRequest(item)}
                        className={`px-[10px] py-1.5 text-[15px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                      >
                        Accept
                      </button>
                      <button
                      onClick={() => handleReject(item)}
                        className={`px-[10px] py-1.5 text-[15px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                      >
                        Reject
                      </button>
                    </div>
                    
                    </div>
                  );
                })}
              </div>
            </div>
    </>
  )
}

export default FriendRequest
