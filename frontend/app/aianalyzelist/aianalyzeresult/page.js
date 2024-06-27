"use client";

import IncHeader from "@/app/components/inc_header";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function AiAnalizeResult() {
    const router = useRouter();
    const token = localStorage.getItem('token');
    const [datas,setDatas] = useState("");
    const [no,setNo] = useState(false);
    
    const handleButton = () => {
        
        const fetchData = async () => {
            try {
              // POST 요청을 통해 서버에 로그인 정보 전송
              const response = await axios.post(
                // '/app/users/login/',
                '/app/chain/aianalyzelist/aianalyzeinfo/', 
                //'/app/drugs/detail/',
                {
                    params: {
                      token: token,
                      customer_drugs : no
                    },
                    headers: {
                      'Authorization': `Token <${token}>`
                    }
                  }
                );
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
          location.href = '/aianalyzelist/aianalyzeprocess2';
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            // POST 요청을 통해 서버에 로그인 정보 전송
            const response = await axios.get(
              '/app/chain/aianalyzelist/aianalyzeresult/',
              {
                params: {
                  token: token
                },
                headers: {
                  'Authorization': `Token <${token}>`
                }
              }
            );
            console.log(response.data);
            setDatas(response.data);
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
        // for (let obj of datas){
        //     names.append(obj.drug_no);
        // }
    }, []);

    const handleButton2 = (no) => {
        console.log(no);
        setNo(no);
    };

    // useEffect(() => {
    //     if (!router) return; // Ensures the router is ready before using it
    // }, [router]);

    return (
        <>
            <IncHeader titles="복용중인 약" urls="/aianalyzelist" />
            
            <div className="px-5 pt-2">
                <p className="text-xl font-bold">같이 드시면 안돼요</p>
                <p className="text-sm text-slate-600">약 간 상호작용 충돌로 부작용이 생길 수 있어요.</p>
            </div>
            {datas.langChainData && datas.langChainData.map((data, index) => (
            <div className="p-5">
                <div className="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row w-full px-5 pt-5">
                            <div className="w-full h-full flex flex-col basis-1/2 text-center">
                                <div className="w-full h-full flex justify-center">
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${data.drug_img_key_1}`} alt="image" />
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{data.drug_material_1}</span>
                                <h5 className="mb-1 font-bold dark:text-white">{data.drug_name_1}</h5>
                            </div>
                            <div className="basis-1/6 flex items-center justify-center">
                                <p className="text-[#2CC65B] text-2xl font-bold">x</p>
                            </div>
                            <div className="w-full h-full flex flex-col basis-1/2 text-center">
                                <div className="w-full h-full flex justify-center">
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${data.drug_img_key_2}`} alt="image" />
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{data.drug_material_2}</span>
                                <h5 className="mb-1 font-bold dark:text-white">{data.drug_name_2}</h5>
                            </div>
                        </div>
                        <div className="p-5">
                            <hr className="w-full" />
                            <div className="flex mt-4 text-xs justify-start">
                                {data.output}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                ))};

                <div className="px-5 pt-2 pb-2">
                    <p className="text-xl font-bold">같은 효과, 저렴하게 약사기</p>
                    <p className="text-sm text-slate-600">내 섭취량 기준, 일주일 처방시 비교 가격이에요</p>
                </div>

            {datas.priceData && datas.priceData.map((data, index) => (
            <>
            <div className="px-5 py-2 w-full flex flex-rows">
                <div className="basis-1/4">
                    <div className="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-2 pt-2">
                            <img className="w-14 h-14 mb-3 rounded-full shadow-lg" src={`${data.customer.drug_img_key}`} alt={`${data.customer.drug_name}`} />
                            <div className='flex text-xs items-center'>
                                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-xs w-4 h-4 css-i4bv87-MuiSvgIcon-root mr-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachMoneyIcon">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"></circle>
                                    <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">$</text>
                                </svg> 
                                <span className="text-xs text-[#2cc65b] font-bold">{data.customer.drug_price}</span>원
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-2/4 px-2 text-sm items-center">
                    <p>{data.customer.drug_illness} 치료제</p>
                    <p className="text-xl font-bold text-black">{data.customer.drug_name}</p>
                    <div className="flex items-center">
                        <p className="pt-2 mr-2">1일 섭취량 : {data.customer.take_num}개</p>
                    </div>
                </div>
                <div className="basis-1/4 flex items-center justify-end">
                    <button
                        onClick={()=>{handleButton2(data.drug_no)}}
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

            <div>
                {data.similar && data.similar.map((data, index) => (
                    <div className="p-5">
                    <div className="flex py-4">
                        <div className="w-1/2">
                            <span className="p-1 text-xs mx-auto bg-[#dfe1fb]">{data.drug_classify}의약품</span>
                            <p className="text-l font-bold">{data.drug_name}</p>
                        </div>
                        <div className="w-1/2 flex justify-end items-center font-bold text-slate-600">
                            <p className="text-[#2cc65b]">{data.drug_price}</p>원 저렴&nbsp;
                            <button
                                onClick={()=>{handleButton2(data.drug_no)}}
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
                </div>
                ))};
            </div>

            </>
            
            ))};

                <hr className="w-full" />

            <div className="p-5 pt-10 pb-20 w-full mx-auto">
                <button onClick={handleButton} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">결과저장하기</button>
            </div>
        </>
    );
}
