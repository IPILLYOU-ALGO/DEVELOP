"use client"

import IncHeader from "../components/inc_header";
import Switch from '@mui/material/Switch';
import AiResultsCard from "../components/airesults_card";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useState } from "react";

export default function AiAnalyzeList() {
    const [count,setCount] = useState(1);
    //나중에 데이터로 처리
    // useEffect( async () => {
    //     try {
    //         // POST 요청을 통해 서버에 로그인 정보 전송
    //         const response = await axios.get(
    //             '/app/analyze/results/', 
    //             );
    //         console.log(response[0].data.drug_name)
    //     } catch (error) {
    //         Swal.fire({
    //             title: "로딩 실패",
    //             text: "오류 발생.",
    //             icon: "error",
    //         });
    //     }
    // }, []);

    //const datas = response.data;

    const datas = [
        {
            "names" : "자밀라네팜", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "신경, 결석치료",
            "images" : "https://files.itworld.co.kr/archive/image/2017/11/GettyImages-a8343806-620.jpg"
        },
        {
            "names" : "비맥스(액티브)", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "육체피로,체력저하",
            "images" : "https://cdn.digitaltoday.co.kr/news/photo/202402/507237_472361_1012.jpg"
        },
        {
            "names" : "몰테일", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "종합비타민",
            "images" : "https://www.nutraminshealth.com/healthinfo/wp-content/uploads/2020/07/tablets-3024955_1280-770x540.jpg"
        },
        {
            "names" : "헬씨 오리진스", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "미네랄, 240베지캡슐",
            "images" : "https://www.vitatra.com/webdata/goods_images/684/41684/origin0_ZOOM.jpg?v=1602542707"
        },
        {
            "names" : "커클랜드 시그니처", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "멀티비타민,160정",
            "images" : "https://www.vitatra.com/webdata/goods_images/794/46794/origin0_ZOOM.jpg?v=1683327986"
        },
        {
            "names" : "원어데이", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "우먼스,멀티비타민",
            "images" : "https://www.vitatra.com/webdata/goods_images/272/47272/origin0_ZOOM.jpg?v=1689811365"
        },
        {
            "names" : "닥터스 베시트", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "비타샤인 D3",
            "images" : "https://www.vitatra.com/webdata/goods_images/599/43599/origin0_ZOOM.jpg?v=1638486897"
        },
        {
            "names" : "센트룸", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "멀티구미, 170정",
            "images" : "https://www.vitatra.com/webdata/goods_images/805/42805/origin3_ZOOM.jpg?v=1646955590"
        },
        {
            "names" : "아리나민", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "EX플러스",
            "images" : "https://www.taillist.com/webdata/goods_images/857/146857/origin0.jpg?v=1637731385&ICrop=600"
        },
        {
            "names" : "BAL", 
            "pays" : 370,
            "eats" : "1개",
            "effect" : "종합비타민",
            "images" : "https://d83r1jteficfv.cloudfront.net/merchandises/307/main-images/GOfiIUpkpQ9Z5pEacr3is.jpg?w=630&h=630&q=80"
        },
    ]

    const handleButton = async () => {

        location.href = '/aianalyzelist/aianalyzeprocess'
    }

    return (
        <>
        <IncHeader titles="복용중인 약" urls="/analyze/results" />
        <div className="p-5 flex items-center">
            <p>1일 섭취량을 바꾸고 싶어요</p>
            <Switch defaultChecked />
        </div>
        <div className="px-5 pb-2 text-right">
            <button type="button" className="text-slate-700 hover:text-white bg-white hover:bg-blue-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">삭제하기</button>
        </div>
        {datas.map((data, index) => {
            return(
                <div className="px-5 py-2 w-full flex flex-rows">
                    <div className="basis-1/4 ">
                        <AiResultsCard key={index} data={data} />
                    </div>
                    <div className="basis-2/4 px-2 text-sm items-center">
                        <p>{data.effect}</p>
                        <p className="text-2xl font-bold text-slate-500">{data.names}</p>
                        <div className="flex items-center">
                            <p className="pt-2 mr-2">1일 섭취량 : {data.eats}</p>
                            <select className="w-10 h-7" name="languages" id="lang">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className="basis-1/4 flex items-center justify-end">
                        <PlayCircleFilledIcon />
                    </div>
                </div>
            )
        })}

        <div className="p-5 pt-10 w-full mx-auto">
            <button onClick={()=>{handleButton()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">분석할래요</button>
        </div>

        </>
    )
}