// 2024.06.18~2024.06.25
// 이승주

"use client"

import IncHeader from "@/app/components/inc_header";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";

import AiResultsCard from "@/app/components/airesults_card";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function AiAnalyzeInfo() {
    const [page, setPage] = useState(1)

    const handleButton = (pos) => {
        setPage(pos);
    }

    // 나중에 데이터로 처리
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

    return (
        <>
        <IncHeader titles="" urls="/aianalyzelist/aianalyzeresult" />
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
                <p className="text-xl font-bold">라식스정</p>
                <p className="text-sm text-slate-600">
                    <CheckCircleIcon className="w-3 h-3" />
                    현재 복용중인 약이에요
                    </p>
            </div>
            <div className="basis-1/2 text-right">
            <p>한 알 <span className="font-bold text-[#2cc65b]">800</span>원</p>
            </div>
        </div>

        <div className="flex">
            <div className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex">
                    <li className="basis-1/2 me-2">
                        <a onClick={()=>{handleButton(1)}} className={page == 1 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>기본정보</a>
                    </li>
                    <li className="basis-1/2 me-2">
                        <a onClick={()=>{handleButton(2)}} className={page == 2 ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}>동일성분 다른약</a>
                    </li>
                </ul>
            </div>
        </div>

        <div className={page == 1 ? "p-5" : "p-5 hidden"}>
        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">효과효능</p>
            </div>
            <p>신장에서 나트륨 및 수분의 재흡수를 억제하여 혈압을 감소시키고 부종을 치료하는 약입니다.</p>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">부작용</p>
            </div>
            <p>어지러움, 위장장애, 구토, 변비, 시야흐림, 두통, 초조함, 갈증, 입마름, 가슴 두근거림, 근육경련, 무기력</p>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">주의사항</p>
            </div>
            <ul className="list-disc px-5">
                <li>투여초기 소변량 및 소변 횟수가 일시적으로 증가할 수 있어요.</li>
                <li>가능한 오전중에 투여하고, 늦은 저녁 투여는 피하세요.</li>
                <li>흡수증가를 위해 공복에 복용하세요.</li>
                <li>위장장애가 나타날 수 있어요. </li>
                <li>장시간 눕거나 앉은 자세에서 일어나는 경우 천천히 일어나세요.</li>
                <li>설파제에 대한 과민반응이 있는 경우 의사, 약사에게 미리 알려주세요.</li>
                <li>강한 햇볕이나 자외선에 노출되지 않게 주의하세요.</li>
            </ul>
        </div>

        <div className="mb-5">
            <div className="flex">
                <span className="p-1 rounded-md bg-blue-800"></span><p className="text-xl font-bold pl-2">보관방법</p>
            </div>
            <p>밀폐용기, 실온보관, 차광</p>
        </div>
    
        </div>
        <div className={page == 2 ? "p-5" : "p-5 hidden"}>
        {datas.map((data, index) => {
            return(
                <div className="px-5 py-2 w-full flex flex-rows">
                    <div className="basis-2/6 ">
                        <AiResultsCard key={index} data={data} />
                    </div>
                    <div className="basis-4/6 px-2 text-sm items-center">
                        <p>{data.effect}</p>
                        <p className="text-2xl font-bold text-slate-500">{data.names}</p>
                        <div className="flex items-center">
                            <p className="pt-2 mr-2">1일 섭취량 : {data.eats}</p>
                        </div>
                    </div>
                    <div className="basis-1/6 flex items-center justify-end">
                        <PlayCircleFilledIcon />
                    </div>
                </div>
            )
        })}
        </div>

        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">약정보 저장하기</button>
        </div>

        </>
    )
}