"use client"

import { ReactTyped } from "react-typed";
import { useEffect } from "react";

export default function Analyze() {
    useEffect(() => {
        setTimeout(function() {
            location.href = '/analyze/results';
          }, 3000);
    }, []);

    return (
        <>
        <div className="" style={{
            backgroundImage: `url('/assets/images/img_analyze.png')`,
            backgroundPosition: "center", // 이미지 위치
            backgroundSize: "cover", // 이미지 꽉차게
            backgroundRepeat: 'no-repeat', // 이미지 반복 지정
  		    width:'100%' // 배경이미지 크기
            }}>
            <div className="pt-20 w-full h-screen overflow-hidden">
                <div className="text-center text-lg font-bold">
                    정확한 분석을 위해<br />
                    조금만 기다려주세요!
                </div>
                <div className='pt-32 flex space-x-2 justify-center items-center dark:invert'>
                <span className='sr-only'>Loading...</span>
                    <div className='h-8 w-8 bg-[#2CC65B] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-8 w-8 bg-[#4954FB] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-8 w-8 bg-[#2CC65B] rounded-full animate-bounce'></div>
                </div>

                <div className="pt-20 text-violet-700 text-center text-lg">
                    <ReactTyped
                        className=''
                        strings={[
                            '정보 분석 중',
                            '잠시만 기다려 주세요 :)',
                        ]}
                        typeSpeed={110}
                        backSpeed={100}
                        loop
                        />
                </div>
            </div>

        </div>
        </>
    )
}