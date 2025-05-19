import React, { useState } from "react";
import { inputFied } from "../componet/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Slide, toast } from "react-toastify";
import { getDatabase, push, ref, set } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import HashLoader from "react-spinners/HashLoader";
import { Link, useNavigate } from "react-router";

const SingUp = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigator = useNavigate();
  const [inputFilds, setinputfild] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [inputFildErr, setinputfildErr] = useState({
    emailErr: "",
    fullNameErr: "",
    passwordErr: "",
  });
  const [eye, setEye] = useState(false);
  const [loding, setloding] = useState(false);

  // ------- onchange function
  const handleINputChange = (event) => {
    const { name, value } = event.target;
    setinputfild({
      ...inputFilds,
      [name]: value,
    });
  };
  // ------------ onclick function submitbtn
  const submitbton = (e) => {
    e.preventDefault();
    const { email, fullName, password } = inputFilds;
    if (!email) {
      setinputfildErr({ ...inputFildErr, emailErr: "your email is mising" });
    } else if (!fullName) {
      setinputfildErr({
        ...inputFildErr,
        fullNameErr: "your Full Name is mising",
      });
    } else if (!password) {
      setinputfildErr({
        ...inputFildErr,
        passwordErr: "your password is mising",
      });
    } else {
      setinputfildErr({
        ...inputFildErr,
        emailErr: "",
        fullNameErr: "",
        passwordErr: "",
      });
      setloding(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          updateProfile(auth.currentUser, {
            displayName: fullName || "imran",
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
          // console.log("user information",userinfo);
        })
        .then(() => {
          let databaseRef = push(ref(db, "users/"));
          set(databaseRef, {
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture:
              "https://images.pexels.com/photos/28815479/pexels-photo-28815479/free-photo-of-hummingbird-sipping-nectar-from-fuchsia-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            userUid: auth.currentUser.uid,
          });
          return sendEmailVerification(auth.currentUser);
        })
        .then(() => {
          toast.success(`🦄 ${fullName} your sing up succesfully!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          navigator("/singIn");
        })
        .catch((err) => {
          console.log(`error form ${err}`);
        })
        .finally(() => {
          setloding(false);
          setinputfild({
            email: "",
            fullName: "",
            password: " ",
          });
        });
    }
  };
  console.log("current user information", auth.currentUser);

  const viewer = () => {
    setEye(!eye);
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <>
      <section>
        <div className="container m-auto">
          <div className="w-full h-screen flex justify-center items-center">
            <div className=" w-[55%] p-5 border-2 border-cyan-50 flex justify-center rounded-2xl box relative flex-col gap-3 shadow-2xl ">
              <div className="text-center">
                <h2 className="text-[34px] font-bold font-nunito text-fontColor">
                  Get started with easily register
                </h2>
                <p className="text-[20px] font-normal font-nunito text-fontColor opacity-50">
                  Free register and you can enjoy it
                </p>
              </div>
              <div className="text-center">
                <form>
                  {inputFied.map((inputFied) => {
                    return (
                      <div key={inputFied.id} className=" relative p-[20px]">
                        <input
                          type={
                            inputFied.name.toLocaleLowerCase() ==
                            "email".toLocaleLowerCase()
                              ? "email"
                              : inputFied.name == "fullName"
                              ? "text"
                              : eye
                              ? "text"
                              : "password"
                          }
                          id={inputFied.id}
                          name={inputFied.name}
                          className="w-[450px] p-6 border-2 border-amber-500 rounded-2xl inputF"
                          placeholder={inputFied.place}
                          onChange={handleINputChange}
                          required
                        />

                        <label
                          htmlFor={inputFied.name}
                          className=" absolute top-[50%] translate-y-[-50%]  left-[125px]  inputL"
                        >
                          {inputFied.place}
                        </label>
                        {inputFilds.email == "" &&
                        inputFied.name === "email" ? (
                          <span className="block pl-[100px] text-red-600 text-start">
                            {inputFildErr.emailErr}
                          </span>
                        ) : inputFilds.fullName == "" &&
                          inputFied.name === "fullName" ? (
                          <span className="block pl-[100px] text-red-600 text-start">
                            {inputFildErr.fullNameErr}
                          </span>
                        ) : inputFilds.password == "" &&
                          inputFied.name === "password" ? (
                          <span className="block pl-[100px] text-red-600 text-start">
                            {inputFildErr.passwordErr}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                  <span
                    onClick={viewer}
                    className=" absolute right-[160px] bottom-[204px]"
                  >
                    {eye ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {loding ? (
                    <button className="w-[450px] border-2 border-bandColor bg-bandColor rounded-4xl p-5 ml-5 text-2xl font-normal font-nunito text-white my-5">
                      <HashLoader
                        color={"#fff"}
                        loading={true}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={submitbton}
                      className="w-[450px] border-2 border-bandColor bg-bandColor rounded-4xl p-5 ml-5 text-2xl font-normal font-nunito text-white my-5"
                    >
                      {" "}
                      Sign up
                    </button>
                  )}

                  <p className="text-center text-[13px] font-normal font-poppins text-fontColor">
                    Already have an account ?{" "}
                    <Link to={"/singIn"} className="text-[#EA6C00] font-bold">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingUp;
