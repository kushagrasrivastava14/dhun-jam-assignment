"use client";

import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {

    const router = useRouter()

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSuccessLogin = (res) => {
    localStorage.setItem("accessToken", res?.data?.data?.token)

    router.push(`admin/${res?.data?.data?.id}`)
  }

  const handleLogin = async () => {
    const response = await axios({
      method: "post",
      url: "https://stg.dhunjam.in/account/admin/login",
      data: {
        username: username,
        password: password,
      },
    }).then((res)=>

    // console.log(response, "res");
    res?.status === 200
      ? handleSuccessLogin(res)
      : setError(response?.data?.ui_err_msg) )

      
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center  w-screen h-screen text-body gap-4 ">
      <h1 className="text-heading" >Venue Admin Login</h1>
      <div className="w-60 border-gray-200 border p-2 rounded-md " >
        <input
        
          type="text"
          placeholder="username"
          className="bg-transparent text-gray-400 focus:bg-transparent active::border-none "
          onChange={(e) => handleUsername(e)}
        />
      </div>
      <div className="flex border-gray-200 border p-2 rounded-md ">
        {" "}
        <input

          type={`${showPassword ? "text" : "password"}`}
          placeholder="password"
          className="bg-transparent text-gray-400 active:bg-transparent "
          onChange={(e) => handlePassword(e)}
        ></input>{" "}
        {showPassword? <Eye onClick={() => setShowPassword(!showPassword)} />: <EyeOff onClick={() => setShowPassword(!showPassword)}  /> }{" "}
      </div>
      
      {error && <p className="text-red-400" >{error}</p>}
      <button className="bg-[#6741D9] px-5 w-56 rounded-md " type="button" onClick={() => handleLogin()}>
        Sign In
      </button>

      <p>New Recognition?</p>
    </div>
  );
};

export default Login;
