////////////////////////////////////////
// 개발자 : 이승주(joo4123)
// 기간 : 2024.06.19-2024.06.25
// 구현기능 : 로그인 기능 구현
////////////////////////////////////////
"use client"
import IncHeader from "../components/inc_header";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function Login() {
  const [id,setId] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter();

  const handleLogin = async () => {
    // 서버전달 정보
    const sendData = {
        "customer_id" : id,
        "password" : password,
    }

    console.log("customer_id = " + id);
    console.log("password = " + password);

    try {
        // POST 요청을 통해 서버에 로그인 정보 전송
        const response = await axios.post(
            '/app/users/login/', 
            sendData,
            {headers: { "Content-Type": `application/json`}}
            );
        //console.log(response.data.status_code)
        if (response.data.status_code == 200) {
            // 쿠키에 token 저장
            console.log('token = ' + response.data.token)
            localStorage.setItem('token', response.data.token);
            Swal.fire({
              title: "로그인 성공",
              text: `${response.data.message}`,
              icon: "success",
            });
            router.push('/selectMode');
        } 
    } catch (error) {
        Swal.fire({
            title: "로그인 실패",
            text: "존재하지 않는 계정",
            icon: "error",
        });
    }
  };
    return ( 
        <>
            <IncHeader titles="로그인" urls="/" />

            <div className="p-5 w-full">
              <p className="mb-4 font-bold">닉네임</p>
              <div class="relative w-full min-w-[200px] h-10">
                <input
                  type="text" 
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" 
                  placeholder=" " 
                  value={id} 
                  onChange={(e) => setId(e.target.value)}/>
                  <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">가입시 작성한 닉네임을 입력해주세요.</label>
              </div>
                <div className="mt-2 flex w-full h-7">
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 left-6 top-48"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.625 6C0.625 3.04289 3.04289 0.625 6 0.625C8.95711 0.625 11.375 3.04289 11.375 6C11.375 8.95711 8.95711 11.375 6 11.375C3.04289 11.375 0.625 8.95711 0.625 6ZM6 1.375C3.45711 1.375 1.375 3.45711 1.375 6C1.375 8.54289 3.45711 10.625 6 10.625C8.54289 10.625 10.625 8.54289 10.625 6C10.625 3.45711 8.54289 1.375 6 1.375Z"
                        fill="#F13D2C"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 3.625C6.20711 3.625 6.375 3.79289 6.375 4V6.5C6.375 6.70711 6.20711 6.875 6 6.875C5.79289 6.875 5.625 6.70711 5.625 6.5V4C5.625 3.79289 5.79289 3.625 6 3.625Z"
                        fill="#F13D2C"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.49707 8C5.49707 7.72386 5.72093 7.5 5.99707 7.5H6.00156C6.2777 7.5 6.50156 7.72386 6.50156 8C6.50156 8.27614 6.2777 8.5 6.00156 8.5H5.99707C5.72093 8.5 5.49707 8.27614 5.49707 8Z"
                        fill="#F13D2C"
                      />
                    </svg>
                    <p className="ml-1 text-xs text-left text-[#f13d2c]">
                      닉네임을 입력해 주세요
                    </p>
                </div>
              
            </div>

            <div className="px-5 pb-8 w-full">
              <p className="mb-4 font-bold">비밀번호</p>
              <div class="relative w-full min-w-[200px] h-10">
                <input
                  type="text"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" 
                  placeholder=" " 
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">비밀번호를 입력해주세요.</label>
              </div>
              
            </div>

            <div className="p-5 pt-10 w-full mx-auto">
              <button 
              type="button" 
              onClick={handleLogin}
              className="mx-auto w-full rounded-2xl h-[70px] bg-white text-xl font-bold hover:bg-[#2cc65b] text-gray-400 hover:text-gray-50"
              >로그인</button>
            </div>

            <div className="p-5 w-full mx-autof flex justify-center items-center">
              
            <p className="pr-2">오피스너 계정이 없으신가요?</p>
            <Link href="/register">
              <button className="text-blue-600 border p-1 rounded-md">회원가입</button>
            </Link>
            </div>

        </>
    )
}