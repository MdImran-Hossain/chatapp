import React, { useEffect, useState } from "react";
import Group from "./Group";
import { SucessToast, timeSet, UserLists } from "./InputField";
import { HiDotsVertical } from "react-icons/hi";

import { getDatabase, ref, onValue, push, off, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import UserSkeleton from "../Skeleton/UserSkeleton";
import { FaMinus, FaPlus, FaUser } from "react-icons/fa";
import moment from "moment";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  
  const [Loggeduser, setLoggedUser] = useState({});
  const [realtime, setrealtime] = useState(false);
  const [userList, setuserList] = useState([]);
  const [FRrequestList, setFRrequestList] = useState([]);
  const [loading, setloading] = useState(false);
  const [AllFriend,setAllFriend]=useState ();
// -------------- data fatch for user id

     




  /**
   * todo: fatch data from friends database
   * @peram
   * return voit
   */
  useEffect(() => {
    const fetchfriendRequest = () => {
      const UserRef = ref(db, "Friends/");
      onValue(UserRef, (snapshot) => {
        const userFRList = [];
        snapshot.forEach((item) => {
          if (auth?.currentUser?.uid == item.val().senderUid)
            userFRList.push(item.val().senderUid.concat(item.val().receiverUid));
        });
        setAllFriend(userFRList);

        console.log(userFRList);
        
      });
    };
    fetchfriendRequest();
    // clean up funtion
    return () => {
      const UserRef = ref(db, "Friends/");
      off(UserRef);
    };
  }, []);

console.log('hjkj',AllFriend);


  useEffect(() => {
    const fetchData = () => {
      setloading(true);
      const UserRef = ref(db, "users/");
      onValue(UserRef, (snapshot) => {
        let userblankList = [];
        snapshot.forEach((item) => {
          if(item.val().userUid !==auth.currentUser.uid){
            userblankList.push({ ...item.val(), userKey: item.key });
          }
          else {
            let user = Object.assign({ ...item.val(), userKey: item.key });
            setLoggedUser(user);
          }
        });
        setuserList(userblankList);
        setloading(false);
      });
    };
    fetchData();
    return () => {
      const UserRef = ref(db, "users/");
      off(UserRef);
    };

  }, [realtime]);

// ------------- friends request theke data ana

useEffect(()=>{
  const fetchFriendRequst = ()=>{
    const UserRef = ref(db, "friendRequest/");
    onValue(UserRef, (snapshot) => {
      let FRrequstblankList = [];
      snapshot.forEach((item) => {
        if(auth.currentUser.uid === item.val().senderId ||
        Loggeduser.userUid === item.val().senderId){
          FRrequstblankList.push(
            auth?.currentUser?.uid?.concat(item.val().receiverUid)
          );
        }else {
          console.log("error from fatch Friend Request Data");
        }
        
      });
      setFRrequestList(FRrequstblankList);
      
      
    });
  }
  fetchFriendRequst()
  return () => {
    const UserRef = ref(db, "friendRequest/");
    off(UserRef);
  };
},[])
// console.log(FRrequestList);

  // ---------loading 
  if (loading) {
    return (
      <div>
        <UserSkeleton />
      </div>
    );
  }

  // ---------- friendRuquest
  const handleFriendRequest= (item)=>{
        const friendRuquest=push(ref(db, "friendRequest/"))
        set(friendRuquest, {
          senderUsename:Loggeduser.username,
          senderEmail:Loggeduser.email,
          senderUid:Loggeduser.userUid||auth.currentUser.uid,
          senderprofile_picture:Loggeduser.profile_picture,
          senderUserKey:Loggeduser.userKey,
          receiverUsename:item.username,
          receiverEmail:item.email,
          receiverUid:item.userUid,
          receiverprofile_picture:item.profile_picture,
          receiverUserKey:item.userKey,
          friendRuquestUid:friendRuquest.key,
          createdAt: timeSet()
        }).then(()=>{
          set(push(ref(db, "notificaton/")), {
            notificationMsg: `${Loggeduser.username} Send a friend Request `,
            senderprofile_picture: Loggeduser.profile_picture,
            createdAt: timeSet(),
          });
        }).then(()=>{
          SucessToast(
            `${Loggeduser.username} Send a friend Request `,
            "top-center"
          );
        }).then(()=>{
          let userInfo = {
            FRid: Loggeduser.userUid + item.userUid,
          };
          // now save the information into localstoage
          localStorage.setItem("SenderReciverId", JSON.stringify(userInfo));
          setrealtime(true)
        })
        
  }

  // const SenderReciverId=JSON.parse(localStorage.getItem("SenderReciverId"))
  // const generateFriendId = (uid1, uid2) => [uid1, uid2].sort().join("");


  
  return (
    <>
      <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
        <div className="flex justify-between items-center ">
          <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
            User List
          </h3>
          <span className="text-bandColor text-2xl">
            <HiDotsVertical />
          </span>
        </div>
        <div className="h-[374px] overflow-scroll">
          {userList.map((item, index) => {
            return (
             
              <div key={item.userUid}
                className= {
                  userList?.length - 1 === index?"flex justify-between items-center pt-[14px] pb-[10px]":"flex justify-between items-center pt-[14px] pb-[10px] border-b-2 border-b-[rgba(0,0,0,0.25)]"
                  } >
               <div className="flex justify-start items-center gap-3">
               <div className="w-[70px] h-[70px] rounded-full border flex justify-center items-center">
                  <picture>
                    <img
                      src={item.profile_picture}
                      className="w-full h-full object-cover rounded-full"
                      alt=""
                    />
                  </picture>
                </div>
                <div className={` pl-[14px] pr-[52px] `}>
                  <h4 className="text-[18px] font-semibold font-poppins text-black  ">
                    {item.username}
                  </h4>
                  <p className="text-[14px] font-medium font-poppins text-[rgba(77,77,77,0.75)]">
                  {moment(item.createdAt).fromNow()}

                  </p>
                </div>
               </div>
               {
                FRrequestList.includes(
                  auth.currentUser.uid.concat(item.userUid)
                )?(<button
                  className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                >
                  <FaMinus />
                </button>): AllFriend?.includes(
                  auth.currentUser.uid.concat(item.userUid)
                ) ? (
                <button
                  type="button"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
                >
                  <FaUser />
                </button>
              ):(<button
                onClick={() => handleFriendRequest(item)}
                  className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                >
                  <FaPlus />
                </button>)
               }
               {/* <button
                onClick={() => handleFriendRequest(item)}
                  className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                >
                  <FaPlus />
                </button> */}
               
              
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserList;
