import React, { useEffect, useState } from "react";
import Group from "../../componet/Group";
import Friend from "../../componet/Friend";
import { HiDotsVertical } from "react-icons/hi";
import { FaCameraRetro, FaRegSmile, FaTelegram } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [allMsg, setAllMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getDatabase();
  const auth = getAuth();
  const user = useSelector((store) => store.friend.value);

  useEffect(() => {
    console.log("Redux user:", user);
    console.log("Auth currentUser:", auth.currentUser);
  }, [user, auth]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const dbref = ref(db, "singlemsg");
    onValue(dbref, (snapshot) => {
      let msgArr = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (
          auth.currentUser.uid === data.whoSendMsgUid ||
          auth.currentUser.uid === data.whoRecivedMsgUid
        ) {
          msgArr.push({ ...data, msgKey: item.key });
        }
      });
      setAllMsg(msgArr);
    });
  }, [auth]);

  const handleEmoji = ({ emoji }) => {
    setMsg((prev) => prev + emoji);
  };

  const sendMsg = async () => {
    if (!msg.trim()) return;

    setLoading(true);
    try {
      await push(ref(db, "singlemsg"), {
        whoSendMsgUid: auth.currentUser.uid,
        whoSendMsgusername: auth.currentUser.displayName,
        whoSendMsgEmail: auth.currentUser.email,
        whoSendMsgProfile_picture: auth.currentUser.photoURL,
        whoRecivedMsgUid: user.userUid,
        whoRecivedMsgUserName: user.userName,
        whoRecivedMsgEmail: user.userEmail,
        whoRecivedMsgProfilePicture: user.userProfile,
        message: msg,
        // createdAt: new Date().toISOString(), // optionally
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMsg("");
      setEmojiOpen(false);
      setLoading(false);
    }
  };

  if (!auth.currentUser || !user || !user.userUid) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-bold">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="w-full bg-amber-200 h-[100dvh]">
      <div className="flex h-full relative">
        {/* Sidebar */}
        <div className="w-[40%] bg-blue-300 h-full">
          <Group />
          <Friend showButton={false} />
        </div>

        {/* Chat Area */}
        <div className="w-[60%] bg-green-300 h-full p-7">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <img
                  src={user.userProfile}
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1>{user.userName}</h1>
                <span>{navigator.onLine ? "Online" : "Offline"}</span>
              </div>
            </div>
            <HiDotsVertical />
          </div>

          <hr className="mt-4" />

          {/* Messages */}
          <div className="flex flex-col overflow-y-scroll h-[70vh]">
            {allMsg.map((msg) => {
              const isSender = auth.currentUser.uid === msg.whoSendMsgUid;
              const isReceiver = auth.currentUser.uid === msg.whoRecivedMsgUid;

              if (
                (isSender && msg.whoRecivedMsgUid === user.userUid) ||
                (isReceiver && msg.whoSendMsgUid === user.userUid)
              ) {
                return isSender ? (
                  <div key={msg.msgKey} className="self-end">
                    <div className="flex flex-col items-start mt-7">
                      <div className="px-5 py-3 bg-blue-300 rounded-3xl">
                        <h2>{msg.message}</h2>
                      </div>
                      <p className="text-xs">Today, 2:02pm</p>
                    </div>
                  </div>
                ) : (
                  <div key={msg.msgKey} className="self-start">
                    <div className="flex flex-col items-start mt-4">
                      <div className="px-5 py-3 bg-gray-300 rounded-3xl">
                        <h2>{msg.message}</h2>
                      </div>
                      <p className="text-xs">Today, 2:02pm</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          <hr className="mt-4" />

          {/* Message Input */}
          <div className="flex gap-x-6 items-center mt-4 relative">
            <input
              type="text"
              placeholder="Send a message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="py-3 px-2 bg-gray-200 w-full rounded-2xl border"
            />

            {/* Emoji + Camera */}
            <div className="absolute right-[12%] flex items-center gap-x-4">
              <span
                className="text-xl cursor-pointer"
                onClick={() => setEmojiOpen((prev) => !prev)}
              >
                <FaRegSmile />
              </span>
              <span className="text-xl cursor-pointer">
                <FaCameraRetro />
              </span>
            </div>

            {/* Send Button */}
            {loading ? (
              <span className="text-5xl animate-spin text-gray-500">
                <FaTelegram />
              </span>
            ) : (
              <span className="text-5xl cursor-pointer" onClick={sendMsg}>
                <FaTelegram />
              </span>
            )}
          </div>
        </div>

        {/* Emoji Picker */}
        {emojiOpen && (
          <div className="absolute right-[5%] bottom-[10%] z-50">
            <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
