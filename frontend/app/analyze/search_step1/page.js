"use client"

import IncHeader3 from "../../components/inc_header3";

export default function SearchStep1() {

    const handleButton = () => {
        location.href = '/analyze/search_step2'
    }

    return (
        <>
        <IncHeader3 urls="/analyze/results" pos={1} />
        <div className="px-5 pt-2 pb-6">
            <p className="text-2xl font-bold text-slate-600">질병을 선택해주세요</p>
        </div>

        <div className="p-5 grid grid-cols-2 gap-2">
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">고혈압</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">관절염</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">당뇨병</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">골다공증</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">협심증</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">심근경색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">고지혈증</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">질병8</button>
        </div>
        <div className="p-5">
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#f2f2e8] text-gray-800 shadow-lg">찾는 질병이 없어요</button>
        </div>
        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button onClick={()=>{handleButton()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-white text-gray-500 hover:bg-[#2cc65b] hover:text-gray-50 border border-gray-200">다음</button>
        </div>

        </>
    )
}