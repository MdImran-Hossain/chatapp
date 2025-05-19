import React, { useEffect, useState } from 'react'
import Navbar from '../page/HomePage/Navbar'
import { Outlet, useNavigate } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ValidationError from '../Error/ValidationError';
const RootLayout = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isuserVerified, setisuserVerified] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setisuserVerified(true);
      } else {
        navigate("/singIn");
        // alert("First Verify Your Mail");
      }
    });
  }, []);
  return (
    <><div>
      {
        isuserVerified?(<div className='flex justify-center items-center'>
          <Navbar />
          <div className=' w-full h-[922px] m-6 rounded-2xl  py-[20px'> 
              <Outlet />
          </div>
        </div>):(
        <ValidationError />
        )
      }
    </div>
      
    </>
  )
}

export default RootLayout
