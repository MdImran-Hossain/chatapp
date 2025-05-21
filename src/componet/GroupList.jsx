import React, { useState } from "react";
import { customStyles, GroupListed } from "./InputField";
import { HiDotsVertical } from "react-icons/hi";
import Group from "./Group";
import { FaUserTie } from "react-icons/fa";
import Modal from "react-modal";

const GroupList = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [ModalInput, setModalInput]=useState({
    group_name:'',
    Group_title:'', 
    input_file:'',
  })
  const [grouperror,setgrouperror]=useState({})

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
// =============== onChange={handleonchge} funtion run
const handleonchge = (event) => {
  const { name, value, files } = event.target;
  const newvalue= name === "input_file" ? files[0] : value;
  setModalInput((prev) => ({
    ...prev,
    [name]:newvalue
  }));


  setgrouperror((preError)=>{
    const updateError={...preError}
    if(newvalue !==""){
      updateError[`${name}Error`]=''
    }
  })
};
// ====================== validation 
const validation=(groupinfo)=>{
  let error={}
for(let field in groupinfo){
  if(groupinfo[field]==''){
    error[`${field}Error`]=`${field} is missing`
  }
}
setgrouperror(error)
return object.keys(error).length===0
}


// ========================== handleonclick 

const handleonclick=()=>{
 const error= validation(ModalInput);
 if(error)return
 
}

  return (
    <>
      <div>
        <div className="w-[427px] shadow-2xl rounded-2xl py-[20px] px-[15px]">
          <div className="flex justify-between items-center ">
            <h3 className="text-[20px] font-semibold font-poppins text-[#000]">
              Groups List
            </h3>
            <button
              onClick={openModal}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create Group
            </button>
          </div>
          <div>
            {GroupListed.map((content, index) => {
              return (
                <div
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
                  <div className={` pl-[14px] pr-[52px] `}>
                    <h4 className="text-[18px] font-semibold font-poppins text-black  ">
                      {content.grouphead}
                    </h4>
                    <p className="text-[14px] font-medium font-poppins text-[rgba(77,77,77,0.75)]">
                      {content.grouptext}
                    </p>
                  </div>
                  <div
                    className={`px-[20px] py-1.5 text-[20px] font-semibold cursor-pointer font-poppins bg-bandColor rounded-xl `}
                  >
                    {content.Btn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            close
          </button>
          <a
            href="#"
            className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm "
          >
            <div class="mb-6">
              <label
                for="large-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Group Name
              </label>
              <input
                type="text"
                id="large-input"
                name="group_name"
                onChange={handleonchge}
                className="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "
              />
              <span className="text-red-600">{grouperror && grouperror.group_nameError}</span>
            </div>
            <div class="mb-6">
              <label
                for="large-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Group Title
              </label>
              <input
                type="text"
                id="large-input"
                name="Group_title"
                onChange={handleonchge}
                className="block w-[500px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500"
              />
              <span className="text-red-600">{grouperror && grouperror.Group_titleError}</span>
            </div>

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 "
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" onChange={handleonchge} type="file" name="input_file" class="hidden" />
              </label>
              <span className="text-red-600">{grouperror && grouperror.input_fileError}</span>
            </div>
            <button
              type="button" onClick={handleonclick}
              className="focus:outline-none text-white bg-green-700 font-bold rounded-lg text-[25px] px-5 py-2.5 me-2 mb-2 mt-2"
            >
              create
            </button>
          </a>
        </Modal>
      </div>
    </>
  );
};

export default GroupList;
