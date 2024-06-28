////////////////////////////////////////
// 개발자 : 이승주(joo4123)
// 기간 : 2024.06.19-2024.06.25
// 구현기능 : 페이지 버튼,변경,이동 구현
////////////////////////////////////////
"use client"

import IncHeader4 from "../components/inc_header4";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SelectMode() {
    const [sel, setSel] = useState(0);

    const handleSel1 = () => {
        setSel(1);
        // 링크경로 이동
        console.log("약봉투 촬영");
        Swal.fire({
            title: "약봉투 촬영",
            text: "약봉투를 촬영하시겠습니까 ?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "촬영하기",
            cancelButtonText: "취소"
          }).then((result) => {
            if (result.isConfirmed) {
                location.href = "/selectMode/cameraMessage?mode=bag"
            }
          });
    }

    const handleSel2 = () => {
        setSel(2);
        // 링크경로 이동
        console.log("알약으로 이동");
        Swal.fire({
            title: "알약 촬영",
            text: "알약을 촬영하시겠습니까 ?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "촬영하기",
            cancelButtonText: "취소"
          }).then((result) => {
            if (result.isConfirmed) {
                location.href = "/selectMode/cameraMessage?mode=pill"
            }
          });
    }

    return (
        <>
        <IncHeader4 titles="촬영방식선택" urls="/" />
        <div className="p-5 w-full mx-auto flex justify-center items-center">
            <p className="">촬영방식을 골라주세요</p>
        </div>
        <div className="p-5 grid gap-6">
            <div onClick={handleSel1} className="relative w-full h-full rounded-lg overflow-hidden">
                <img src="/assets/images/sel_bag.png" alt="sel_bag" className="object-cover w-full h-full hover:scale-110 hover:transition-transform hover:ease-in-out hover:brightness-50 hover:duration-500" />
                {sel == 1 ?
                <div className="absolute w-full py-3.5 bottom-0 inset-x-0 bg-slate-500 text-white text-2xl text-center leading-4">
                약봉투
                </div>
                :
                ""
                }
            </div>
            <div onClick={handleSel2} className="relative w-full h-full rounded-lg overflow-hidden">
                <img src="/assets/images/sel_pill.png" alt="sel_pill" className="object-cover w-full h-full hover:scale-110 hover:transition-transform hover:ease-in-out hover:brightness-50 hover:duration-500" />
                {sel == 2 ?
                <div className="absolute w-full py-3.5 bottom-0 inset-x-0 bg-slate-500 text-white text-2xl text-center leading-4">
                    알약
                </div>
                :
                ""
                }
            </div>
        </div>
        </>
    )
}