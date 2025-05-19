import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import SingUp from "./page/SingUp";
import SingIn from "./page/SingIn";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./page/HomePage/Home";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<RootLayout />}> 
          <Route index element={<Home />} />
          <Route path="/Messenger" element={"this is messenger page"} />
          <Route path="/Notification" element={"this is Notification page"} />
          <Route path="/Setting" element={"this is setting page"} />
          </Route>
          <Route path="/SingUp"  element={<SingUp />} />
          <Route path="/singIn" element={<SingIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
