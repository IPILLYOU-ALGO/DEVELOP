"use client"

import IncHeader3 from "../../components/inc_header3";

export default function SearchStep2() {

    const handleButton = () => {
        location.href = '/analyze/search_step3'
    }

    return (
        <>
        <IncHeader3 urls="/analyze/search_step1" pos={2} />
        <div className="px-5 pt-2 pb-6">
            <p className="text-2xl font-bold text-slate-600">약의 색과 모양을<br />선택해주세요</p>
        </div>
        <div className="px-5">
            <p className="font-bold">색</p>
        </div>
        <div className="p-5 grid grid-cols-2 gap-2">
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">흰색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">노란색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">주황색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">빨간색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">연두색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">초록색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">파란색</button>
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold hover:bg-[#4954fb] hover:text-gray-50 bg-white text-gray-800 border border-gray-300">분홍색</button>
        </div>
        <div className="px-5 pb-4">
            <p className="font-bold">모양</p>
        </div>

        <div className="px-5 grid grid-cols-3 gap-2">
            <div class="w-full max-w-sm hover:bg-[#4954fb] text-black hover:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 flex flex-col items-center">
                    <img class="w-15 h-15 mb-3 rounded-full shadow-lg" src="/assets/images/img_type_1.png" alt="이미지"/>
                    <h5 class="mb-1 text-sm font-medium">원형</h5>
                </div>
            </div>
            <div class="w-full max-w-sm hover:bg-[#4954fb] text-black hover:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 flex flex-col items-center">
                    <img class="w-15 h-15 mb-3 rounded-full shadow-lg" src="/assets/images/img_type_2.png" alt="이미지"/>
                    <h5 class="mb-1 text-sm font-medium">타원형</h5>
                </div>
            </div>
            <div class="w-full max-w-sm hover:bg-[#4954fb] text-black hover:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 flex flex-col items-center">
                    <img class="w-15 h-15 mb-3 rounded-full shadow-lg" src="/assets/images/img_type_3.png" alt="이미지"/>
                    <h5 class="mb-1 text-sm font-medium">잠방형</h5>
                </div>
            </div>
            <div class="w-full max-w-sm hover:bg-[#4954fb] text-black hover:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 flex flex-col items-center">
                    <img class="w-15 h-15 mb-3 rounded-full shadow-lg" src="/assets/images/img_type_4.png" alt="이미지"/>
                    <h5 class="mb-1 text-sm font-medium">팔각형</h5>
                </div>
            </div>
            <div class="w-full max-w-sm hover:bg-[#4954fb] text-black hover:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 flex flex-col items-center">
                    <img class="w-15 h-15 mb-3 rounded-full shadow-lg" src="/assets/images/img_type_5.png" alt="이미지"/>
                    <h5 class="mb-1 text-sm font-medium">기타</h5>
                </div>
            </div>
        </div>

        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button onClick={()=>{handleButton()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-white text-gray-500 hover:bg-[#2cc65b] hover:text-gray-50 border border-gray-200">다음</button>
        </div>

        </>
    )
}