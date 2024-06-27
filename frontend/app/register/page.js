"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Swal from "sweetalert2";

import IncHeader from "../components/inc_header";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const router = useRouter();
 
  const intAgeGroup = (age) => {
    if (age == "20대 초중반" ) {setAgeGroup("20_early");}
    if (age == "20대 중후반" ) {setAgeGroup("20_late");}
    if (age == "30대 초중반" ) {setAgeGroup("30_early");}
    if (age == "30대 중후반" ) {setAgeGroup("30_late");}
    if (age == "40대 초중반" ) {setAgeGroup("40_early");}
    if (age == "40대 중후반" ) {setAgeGroup("40_late");}
    if (age == "50대 초중반" ) {setAgeGroup("50_early");}
    if (age == "50대 중후반" ) {setAgeGroup("50_late");}
    if (age == "60대 초중반" ) {setAgeGroup("60_early");}
    if (age == "60대 중후반" ) {setAgeGroup("60_late");}
    if (age == "70대 초중반" ) {setAgeGroup("70_early");}
    if (age == "70대 중후반" ) {setAgeGroup("70_late");}
  }
  
  const reAgeGroup = (age) => {
    if (age == "20_early" ) {return("20대 초중반");}
    if (age == "20_late" ) {return("20대 중후반");}
    if (age == "30_early" ) {return("30대 초중반");}
    if (age == "30_late" ) {return("30대 중후반");}
    if (age == "40_early" ) {return("40대 초중반");}
    if (age == "40_late" ) {return("40대 중후반");}
    if (age == "50_early" ) {return("50대 초중반");}
    if (age == "50_late" ) {return("50대 중후반");}
    if (age == "60_early" ) {return("60대 초중반");}
    if (age == "60_late" ) {return("60대 중후반");}
    if (age == "70_early" ) {return("70대 초중반");}
    if (age == "70_late" ) {return("70대 중후반");}
  }

  const handleRegister = async () => {
    // 서버전달 정보
    const sendData = {
        "customer_id" : username,
        "password" : password,
        "sex" : gender, 
        "age" : ageGroup
    }

    console.log("customer_id = " + username);
    console.log("password = " + password);
    console.log("sex = " + gender);
    console.log("age = " + ageGroup);

    try {
        // POST 요청을 통해 서버에 로그인 정보 전송
        const response = await axios.post(
            '/app/users/register/', 
            sendData,
            {headers: { "Content-Type": `application/json`}}
            );
        console.log(response.data.status_code)
        if (response.data.status_code == 201) {
            // 쿠키에 token 저장
            console.log('token = ' + response.data.token)
            localStorage.setItem('token', response.data.token);
            Swal.fire({
              title: "회원가입 성공",
              text: `${response.data.message}`,
              icon: "success",
            });
            router.push('/');
        } else {
            // 로그인 실패 시 에러 메시지 표시
            Swal.fire({
                title: "회원가입 실패",
                text: "회원가입에 실패하였습니다. 다시 시도하여 주십시요.",
                icon: "error",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "회원가입 실패",
            text: "아이디, 패스워드 10글자 이상 적으셔야 합니다.",
            icon: "error",
        });
    }
  };

  return (
    <>
      <IncHeader titles="회원가입" urls="/" />
      <div className="p-5 w-full">
        <div className="relative w-full min-w-[200px] h-10">
          <input
            type="text"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            뭐라고 불러드릴까요 ?
          </label>
        </div>
      </div>
      <div className="p-5 w-full">
        <div className="relative w-full min-w-[200px] h-10">
          <input
            type="password"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            비밀번호를 입력해주세요.
          </label>
        </div>
      </div>
      <div className="p-5 w-full">
        <p className="mb-4 font-bold">성별을 입력해주세요.</p>
        <div className="w-full flex flex-row">
          <button
            type="button"
            className={`h-12 basis-1/2 ${
              gender === "male"
                ? "bg-blue-700 text-white"
                : "bg-slate-200 text-gray-900"
            } hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
            onClick={() => setGender("male")}
          >
            남자
          </button>
          <button
            type="button"
            className={`h-12 basis-1/2 ${
              gender === "female"
                ? "bg-blue-700 text-white"
                : "bg-slate-200 text-gray-900"
            } hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
            onClick={() => setGender("female")}
          >
            여자
          </button>
        </div>
      </div>
      <div className="p-5 w-full">
        <p className="mb-4 font-bold">연령대를 선택해주세요.</p>
        <div className="w-full grid grid-cols-2">
          {[
            "20대 초중반",
            "20대 중후반",
            "30대 초중반",
            "30대 중후반",
            "40대 초중반",
            "40대 중후반",
            "50대 초중반",
            "50대 중후반",
            "60대 초중반",
            "60대 중후반",
            "70대 초중반",
            "70대 중후반",
          ].map((age, index) => (
            <button
              key={index}
              type="button"
              className={`h-12 basis-1/2 ${
                reAgeGroup(ageGroup) === age ? "bg-blue-700 text-white" : "bg-slate-200 text-gray-900"
              }hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
              onClick={() => intAgeGroup(age)}
            >
              {age}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 pt-5 w-full mx-auto">
        <button
          type="button"
          onClick={handleRegister}
          className="mx-auto w-full rounded-2xl h-[70px] bg-white text-xl font-bold hover:bg-[#2cc65b] text-gray-400 hover:text-gray-50"
        >
          가입완료
        </button>
      </div>
    </>
  );
}
