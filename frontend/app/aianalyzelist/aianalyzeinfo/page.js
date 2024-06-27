"use client";

import IncHeader from "@/app/components/inc_header";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";

import AiResultsCard from "@/app/components/airesults_card";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Swal from "sweetalert2";

import { useRef } from "react";
import html2canvas from "html2canvas";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function AiAnalyzeInfo() {
    const [page, setPage] = useState(1)
    const router = useRouter();
    const captureRef = useRef(null);
    const [datas,setDatas] = useState();
    const [caution,setCaution] = useState();

    const handleCapture = async () => {
        console.log("hi")
        if (captureRef.current){
            const canvas = await html2canvas(captureRef.current);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = 'capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleButton = (pos) => {
        setPage(pos);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // POST 요청을 통해 서버에 로그인 정보 전송
                const response = await axios.get(
                    '/app/chain/aianalyzelist/aianalyzeinfo/', 
                    );
                setDatas(response.data)
                console.log(response);
                console.log(response.data.data);
                setCaution(datas.data[0].drug_caution.replace(/\//g, '\n'));
                // setCaution(datas.data[0].drug_caution);
                console.log(caution);
            } catch (error) {
                Swal.fire({
                    title: "로딩 실패",
                    text: "오류 발생.",
                    icon: "error",
                });
            }
            
        }
        fetchData();

    }, []);

    return (
        <>
        <IncHeader titles="" urls="/aianalyzelist/aianalyzeresult" />
        <div ref = {captureRef}>
        <div className="flex flex-row h-40">
            <div className="basis-1/2"
            style={{
                backgroundImage: `url('https://files.itworld.co.kr/archive/image/2017/11/GettyImages-a8343806-620.jpg')`,
                backgroundPosition: "center", // 이미지 위치
                backgroundSize: "cover", // 이미지 꽉차게
                backgroundRepeat: 'no-repeat', // 이미지 반복 지정
                width:'100%' // 배경이미지 크기
              }}
            >
            </div>
            <div className="basis-1/2"
            style={{
                backgroundImage: `url('https://cdn.digitaltoday.co.kr/news/photo/202402/507237_472361_1012.jpg')`,
                backgroundPosition: "center", // 이미지 위치
                backgroundSize: "cover", // 이미지 꽉차게
                backgroundRepeat: 'no-repeat', // 이미지 반복 지정
                width:'100%' // 배경이미지 크기
                }}            
            >
            </div>
        </div>

        <div className="p-5 flex">
            <div className="basis-1/2">
                <p className="text-xl font-bold">{datas&&datas.data[0].drug_name}</p>
                <p className="text-sm text-slate-600">
                    <CheckCircleIcon className="w-3 h-3" />
                    현재 복용중인 약이에요
                    </p>
            </div>
            <div className="basis-1/2 text-right">
            <p>한 알 <span className="font-bold text-[#2cc65b]">{datas&&datas.data[0].drug_price}</span>원</p>
            </div>
        </div>

        <div className="flex">
            <div className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex">
                    <li className="basis-1/2 me-2 font-bold">
                        <a onClick={()=>{handleButton(1)}} className={page == 1 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>기본정보</a>
                    </li>
                    <li className="basis-1/2 me-2 font-bold">
                        <a onClick={()=>{handleButton(2)}} className={page == 2 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>동일성분 다른약</a>
                    </li>
                </ul>
            </div>
        </div>

        <div className={page == 1 ? "p-5" : "p-5 hidden"}>
        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">효능효과</p>
            </div>
            <p>{datas&&datas.data[0].drug_effect}</p>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">부작용</p>
            </div>
            <p>{datas&&datas.data[0].drug_sideeffect}</p>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">주의사항</p>
            </div>
            <ul className="list-disc px-5">
                {/* <p>{datas&&caution}</p> */}
                <pre className="text-wrap">{caution}</pre>
                {/* <li>투여초기 소변량 및 소변 횟수가 일시적으로 증가할 수 있어요.</li>
                <li>가능한 오전중에 투여하고, 늦은 저녁 투여는 피하세요.</li>
                <li>흡수증가를 위해 공복에 복용하세요.</li>
                <li>위장장애가 나타날 수 있어요. </li>
                <li>장시간 눕거나 앉은 자세에서 일어나는 경우 천천히 일어나세요.</li>
                <li>설파제에 대한 과민반응이 있는 경우 의사, 약사에게 미리 알려주세요.</li>
                <li>강한 햇볕이나 자외선에 노출되지 않게 주의하세요.</li> */}
            </ul>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">보관방법</p>
            </div>
            <p>{datas&&datas.data[0].drug_save}</p>
        </div>
    
        </div>
        <div className={page == 2 ? "p-5" : "p-5 hidden"}>
        {datas && datas.similar_drug.map((data, index) => {
            return(
                <div key={index} className="px-5 py-2 w-full flex flex-rows">
                    <div className="basis-2/6 ">
                        <AiResultsCard data={data} />
                    </div>
                    <div className="basis-4/6 px-2 text-sm items-center">
                        <p>{data.drug_illness}</p>
                        <p className="text-xl font-bold">{data.drug_name}</p>
                        <div className="flex items-center">
                            <p className="pt-2 mr-2">1일 섭취량 : 1개</p>
                        </div>
                    </div>
                    <div className="basis-1/6 flex items-center justify-end">
                        <button
                            onClick={()=>{handleButton(1)}}
                            style={{ backgroundColor: '#d4d7dd', borderRadius: '50%', padding: '2px' }}
                        >
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-xs w-4 h-4 css-i4bv87-MuiSvgIcon-root"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="ArrowForwardIcon"
                                style={{ color: '#a3a9b5' }}
                            >
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        })}
        </div>
        </div>
        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button onClick = {()=>{handleCapture()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">약정보 저장하기</button>
        </div>

        </>
    );
}
