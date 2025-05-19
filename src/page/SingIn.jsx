import React, { useState } from "react";
import { loginputFied } from "../componet/Loginginput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Bounce, Slide, toast } from 'react-toastify';
import {
  getAuth,
  signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import HashLoader from "react-spinners/HashLoader";
import { Link, useNavigate } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";

const SingIn = () => {
  const auth = getAuth();
  const db=getDatabase()
  const navigator= useNavigate()

  const [inputFilds, setinputfild] = useState({
    email: "",
    password: "",
  });
  const [inputFildErr, setinputfildErr] = useState({
    emailErr: "",
    passwordErr: "",
  });
  const [eye, setEye] = useState(false);
  const [loding,setloding]=useState(false)
  const handleINputChange = (event) => {
    const { name, value } = event.target;
    setinputfild({
      ...inputFilds,
      [name]: value,
    });
  };
  const submitbton = (e) => {
    e.preventDefault();
    const { email, password } = inputFilds;
    if (!email) {
      setinputfildErr({ ...inputFildErr, emailErr: "your email is mising" });
    }  else if (!password) {
      setinputfildErr({
        ...inputFildErr,
        passwordErr: "your password is mising",
      });
    } else {
      setinputfildErr({
        ...inputFildErr,
        emailErr: "",
        passwordErr: "",
      });
      setloding(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
            toast.success(`🦄 loging succesfully!`, {
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
            navigator("/")
        }) 
          
        .catch((err) => {
          console.log(`error form ${err}`);
        })
        .finally(()=>{
          setloding(false)
         setinputfild({
          email:"",
          password:" "
         })
        //    navigator("/singIn")
        });
    }
  };
//   console.log("current user information",auth.currentUser);
  
  const viewer = () => {
    setEye(!eye);
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const googlehander=(e)=>{
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userInfo)=>{
      const {user}=userInfo;
      let databaseRef=push(ref(db, 'users/'));
                set(databaseRef, {
                  username: user.displayName|| "Missing name",
                  email: user.email || "Missing Email",
                  profile_picture :user.photoURL,
                  userUid:user.uid
                });
                navigator("/")
    }).catch((err)=>{
        console.log('hschjs',err);
        
    })
  }
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
                  {loginputFied.map((loginputFied) => {
                    return (
                      <div key={loginputFied.id} className=" relative p-[20px]">
                        <input
                          type={
                            loginputFied.name ==
                            "email"
                              ? "email"
                              
                              : eye
                              ? "text"
                              : "password"
                          }
                          id={loginputFied.id}
                          name={loginputFied.name}
                          className="w-[450px] p-6 border-2 border-amber-500 rounded-2xl inputF"
                          placeholder={loginputFied.place}
                          onChange={handleINputChange}
                          required
                        />

                        <label
                          htmlFor={loginputFied.name}
                          className=" absolute top-[50%] translate-y-[-50%]  left-[125px]  inputL"
                        >
                          {loginputFied.place}
                        </label>
                        {inputFilds.email == "" &&
                        loginputFied.name === "email" ? (
                          <span className="block pl-[100px] text-red-600 text-start">
                            {inputFildErr.emailErr}
                          </span>
                        )  : inputFilds.password == "" &&
                        loginputFied.name === "password" ? (
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
                    className=" absolute right-[160px] bottom-[238px]"
                  >
                    {eye ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {
                    loding?( <button
                      className="w-[450px] border-2 border-bandColor bg-bandColor rounded-4xl p-5 ml-5 text-2xl font-normal font-nunito text-white my-5"
                    >
                     <HashLoader
        color={"#fff"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
                    </button>):( <button
                    onClick={submitbton} 
                    className="w-[450px] border-2 border-bandColor bg-bandColor rounded-4xl p-5 ml-5 text-2xl font-normal font-nunito text-white my-5"
                  > Sign In
                    
                  </button>)
                  }
                 
                  <p className="text-center text-[13px] font-normal font-poppins text-fontColor">
                    Already have an account ?{" "}
                    <Link to={'/SingUp'} className="text-[#EA6C00] font-bold">Sign Up</Link>
                  </p>
                </form>
                <button onClick={googlehander} className="flex justify-center w-full gap-2 items-center mt-3"><span className=""><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" className="w-[20px]" alt="" /></span> Continue with Google</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingIn

