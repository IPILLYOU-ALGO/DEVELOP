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
          console.log(response);
          console.log(response.data.data[0]);
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
    }, [token]);
    // console.log(response.data);
    // 나중에 데이터로 처리
    const datas = [
        {
            "names" : "자밀라네팜", 
            "effect" : "신경, 결석치료",
            "images" : "https://files.itworld.co.kr/archive/image/2017/11/GettyImages-a8343806-620.jpg"
        },
        {
            "names" : "비맥스(액티브)", 
            "effect" : "육체피로,체력저하",
            "images" : "https://cdn.digitaltoday.co.kr/news/photo/202402/507237_472361_1012.jpg"
        },
        {
            "names" : "몰테일", 
            "effect" : "종합비타민",
            "images" : "https://www.nutraminshealth.com/healthinfo/wp-content/uploads/2020/07/tablets-3024955_1280-770x540.jpg"
        },
        {
            "names" : "헬씨 오리진스", 
            "effect" : "미네랄, 240베지캡슐",
            "images" : "https://www.vitatra.com/webdata/goods_images/684/41684/origin0_ZOOM.jpg?v=1602542707"
        },
        {
            "names" : "커클랜드 시그니처", 
            "effect" : "멀티비타민,160정",
            "images" : "https://www.vitatra.com/webdata/goods_images/794/46794/origin0_ZOOM.jpg?v=1683327986"
        },
        {
            "names" : "원어데이", 
            "effect" : "우먼스,멀티비타민",
            "images" : "https://www.vitatra.com/webdata/goods_images/272/47272/origin0_ZOOM.jpg?v=1689811365"
        },
        {
            "names" : "닥터스 베시트", 
            "effect" : "비타샤인 D3",
            "images" : "https://www.vitatra.com/webdata/goods_images/599/43599/origin0_ZOOM.jpg?v=1638486897"
        },
        {
            "names" : "센트룸", 
            "effect" : "멀티구미, 170정",
            "images" : "https://www.vitatra.com/webdata/goods_images/805/42805/origin3_ZOOM.jpg?v=1646955590"
        },
        {
            "names" : "아리나민", 
            "effect" : "EX플러스",
            "images" : "https://www.taillist.com/webdata/goods_images/857/146857/origin0.jpg?v=1637731385&ICrop=600"
        },
        {
            "names" : "BAL", 
            "effect" : "종합비타민",
            "images" : "https://d83r1jteficfv.cloudfront.net/merchandises/307/main-images/GOfiIUpkpQ9Z5pEacr3is.jpg?w=630&h=630&q=80"
        },
    ]

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
            4개의 알약이<br />
            발견됐어요!
        </div>

        <div className="px-5 pt-4 pb-2 text-right">
            <button onClick={() => handleFlag()} type="button" className="text-slate-700 hover:text-white bg-white hover:bg-blue-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">{titles}</button>
        </div>

        <div className="px-5 grid grid-cols-2 gap-2">
            {datas.map((data, index) => {
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