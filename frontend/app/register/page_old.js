"use client"

import IncHeader from "../components/inc_header";

export default function Register() {
    return (
        <>
        <IncHeader titles="회원가입" urls="/" />
        <div className="p-5 w-full">
            <div class="relative w-full min-w-[200px] h-10">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" placeholder=" " />
                  <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">뭐라고 불러드릴까요 ?</label>
            </div>
        </div>
        <div className="p-5 w-full">
            <div class="relative w-full min-w-[200px] h-10">
                <input
                  class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" placeholder=" " />
                  <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">비밀번호를 입력해주세요.</label>
            </div>
        </div>
        <div className="p-5 w-full">
            <p className="mb-4 font-bold">성별을 입력해주세요.</p>
            <div className="w-full flex flex-row">
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">남자</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">여자</button>
            </div>
        </div>
        <div className="p-5 w-full">
            <p className="mb-4 font-bold">연령대를 선택해주세요.</p>
            <div className="w-full grid grid-cols-2">
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">20대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">20대 중후반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">30대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">30대 중후반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">40대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">40대 중후반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">50대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">50대 중후반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">60대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">60대 중후반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">70대 초중반</button>
                <button type="button" class="h-12 basis-1/2 bg-blue-700 text-gray-900 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-slate-200 hover:bg-blue-700 focus:ring-blue-800">70대 중후반</button>
            </div>
        </div>

        <div className="p-5 pt-5 w-full mx-auto">
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] bg-white text-xl font-bold hover:bg-[#2cc65b] text-gray-400 hover:text-gray-50">가입완료</button>
        </div>

        </>
    )
}