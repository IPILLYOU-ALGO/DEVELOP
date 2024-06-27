"use client"

import ResultsCard from "@/app/components/results_card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function Results() {
    const router = useRouter();
    const [flag, setFlag] = useState(false);
    const [titles, setTitles] = useState('삭제하기');
    const token = localStorage.getItem('token');
    const [datas,setDatas] = useState(null);
    const [len,setLen] = useState(0);
    const handleFlag = () => {
        setFlag(!flag);

        if (flag == true) { setTitles('삭제하기'); }
        if (flag == false) { setTitles('확인완료'); }
        router.refresh();

    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            // POST 요청을 통해 서버에 로그인 정보 전송
            console.log(token);
            const response = await axios.get(
              '/app/drugs/analyze/results/',
              {
                params: {
                  token: token
                },
                headers: {
                  'Authorization': `Token <${token}>`
                }
              }
            );
            console.log(response.data.data);
            setDatas(response.data.data);
            console.log('datas = ' + datas);
            setLen(response.data.data.length);
          } catch (error) {
            console.log(token);
            Swal.fire({
              title: "로딩 실패",
              text: "오류 발생.",
              icon: "error",
            });
          }
        };
      
        fetchData();
      }, []);

    const handleButton = () => {
        location.href = '/aianalyzelist'
    }

    const handleSearch = () => {
        location.href = '/analyze/search_step1'
    }

    useEffect(() => {
        
      }, [flag]);
    
    return(
        <>
        <div className="mt-20 mb-5 text-slate-700 text-center text-2xl">
            {len}개의 알약이<br />
            발견됐어요!
        </div>

        <div className="px-5 pt-4 pb-2 text-right">
            <button onClick={() => handleFlag()} type="button" className="text-slate-700 hover:text-white bg-white hover:bg-blue-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">{titles}</button>
        </div>

        <div className="px-5 grid grid-cols-2 gap-2">
            {datas && datas.map((data, index) => {
                return(
                   <ResultsCard key="index" data={data} flag={flag} />
                )
            })}
        </div>
        <div className="px-8 pt-4">
            <img src="/assets/images/img_result_tip.png" />
        </div>
        <div className="px-5 pb-10 w-full flex flex-rows">
            <div className="basis-1/4 ">
                <button onClick={()=>{handleSearch()}} type="button" className="text-white bg-blue-700 w-[60px] h-[60px] rounded-full">검색</button>
            </div>
            <div className="basis-3/4">
                <button onClick={()=>{handleButton()}} type="button" className="text-white bg-[#2cc65b] w-full h-[60px] rounded-md">다찍혔어요</button>
            </div>
        </div>

        </>
    )
}