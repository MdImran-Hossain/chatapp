import React, { useState } from "react";
import { customStyles, GroupListed } from "./InputField";
import { HiDotsVertical } from "react-icons/hi";
import Group from "./Group";
import { FaUserTie } from "react-icons/fa";
import Modal from "react-modal";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push, off, set } from "firebase/database";

const GroupList = () => {
  const auth = getAuth();
    const db = getDatabase();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ModalInput, setModalInput] = useState({
    group_name: "",
    Group_title: "",
    input_file: "",
  });
  const [grouperror, setgrouperror] = useState({});
  const [loading, setloading]=useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    // Clear form and errors when modal is closed
    setModalInput({
      group_name: "",
      Group_title: "",
      input_file: "",
    });
    setgrouperror({});
  }

  const handleonchge = (event) => {
    const { name, value, files } = event.target;
    const newvalue = name === "input_file" ? files[0] : value;

    setModalInput((prev) => ({
      ...prev,
      [name]: newvalue,
    }));

    setgrouperror((prevError) => {
      const updateError = { ...prevError };
      if (newvalue !== "") {
        updateError[`${name}Error`] = "";
      }
      return updateError;
    });
  };

  const validation = (groupinfo) => {
    let error = {};
    for (let field in groupinfo) {
      if (groupinfo[field] === "") {
        error[`${field}Error`] = `${field.replace("_", " ")} is missing`;
      }
    }
    setgrouperror(error);
    return Object.keys(error).length === 0;
  };

  const handleonclick = async () => {
  const isValid = validation(ModalInput);
  if (!isValid) return;

  const formData = new FormData();
  formData.append("file", ModalInput.input_file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
const cloudinaryApli=import.meta.env.VITE_CLOUDINARY_API
  setloading(true);
  try {
    const Url = await fetch(cloudinaryApli,{
      method:'post',
      body:formData
    })
const Grouplist=push(ref(db, "Grouplist/"))
    set(Grouplist, {
      adminUid: auth.currentUser.uid,
      adminName: auth.currentUser.displayName,
      adminEmail: auth.currentUser.email,
      adminPhoto: auth.currentUser.photoURL,
      groupName: ModalInput.group_name,
      groupTagName: ModalInput.Group_title,
      groupImage: Url,
    });

    alert("Group created successfully!");

  } catch (error) {
    console.error("Upload Error:", error);
  } finally {
    setloading(false);
    setModalInput({
      group_name: "",
      Group_title: "",
      input_file: "",
    });
    setgrouperror({});
    closeModal(); // 
  }
};

  return (
    <>
      <div>
        <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
              Groups List
            </h3>
            <button
              onClick={openModal}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Create Group
            </button>
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
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Group Modal"
      >
        <button
          onClick={closeModal}
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
        >
          Close
        </button>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Group Name
            </label>
            <input
              type="text"
              name="group_name"
              value={ModalInput.group_name}
              onChange={handleonchge}
              className="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"
            />
            <span className="text-red-600">{grouperror?.group_nameError}</span>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Group Title
            </label>
            <input
              type="text"
              name="Group_title"
              value={ModalInput.Group_title}
              onChange={handleonchge}
              className="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base"
            />
            <span className="text-red-600">{grouperror?.Group_titleError}</span>
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={handleonchge}
                type="file"
                name="input_file"
                className="hidden"
              />
            </label>
          </div>
          <span className="text-red-600">{grouperror?.input_fileError}</span>
            {loading?(<button
            type="button"
            className="mt-4 text-white bg-green-700 font-bold rounded-lg text-[18px] px-5 py-2.5"
          >
            Create .....
          </button>):(<button
            type="button"
            onClick={handleonclick}
            className="mt-4 text-white bg-green-700 font-bold rounded-lg text-[18px] px-5 py-2.5"
          >
            Create
          </button>)}
          
        </div>
      </Modal>
    </>
  );
};

export default GroupList;
