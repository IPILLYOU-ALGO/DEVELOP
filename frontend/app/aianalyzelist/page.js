"use client";
import IncHeader from "../components/inc_header";
import Switch from '@mui/material/Switch';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 가져오기
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://211.216.177.2:15200";

// 커스텀 Switch 컴포넌트
const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#4954fb',
        '&:hover': {
            backgroundColor: 'rgba(73, 84, 251, 0.08)',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#4954fb',
    },
}));

// 커스텀 Modal 스타일
const modalStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '20px',
    padding: '16px',
};

export default function AiAnalyzeList() {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [intakeAmounts, setIntakeAmounts] = useState({});
    const [open, setOpen] = useState(false);
    const [currentDrug, setCurrentDrug] = useState(null);
    const router = useRouter(); // useRouter 훅 사용
    const token = localStorage.getItem('token');
    const [datas,setDatas] = useState(null);
    const result = [];
    let clicked = [];

    useEffect(() => {
        const fetchData = async () => {
          try {
            // POST 요청을 통해 서버에 로그인 정보 전송
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

    const handleSwitchChange = (event) => {
        setShowSelect(event.target.checked);
    };

    const handleSelectClick = (drugName) => {
        setCurrentDrug(drugName);
        setOpen(true);
    };

    const handleSelectClose = () => {
        setOpen(false);
        setCurrentDrug(null);
    };

    const handleSelectChange = (value) => {
        setIntakeAmounts((prev) => ({
            ...prev,
            [currentDrug]: `${value}개`,
        }));
        console.log(intakeAmounts);
        // if (value !== 1) {
        //     setSelectedDrug(currentDrug);
        // } else {
        //     setSelectedDrug(null);
        // }
        handleSelectClose();
    };
    const handleChoose = (code) =>{
        if (clicked.includes(code)){
            clicked = clicked.filter(item => item !== code);
        }else{
            clicked.push(code);
        }
        console.log(clicked);
    }

    const handleButton = async () => {
        for (let [key, value] of Object.entries(intakeAmounts)) {
            if (clicked.includes(key)){
                result.push({
                    drug_no: key,
                    take_num: value
                  });
                handleChoose(key)
                
            }
            // else{
            //     result.push({
            //         drug_no: key,
            //         take_num: "1개"
            //       });
            // }

        }
        for (let i of clicked){
            result.push({
                drug_no: i,
                take_num: "1개"
              });
        }
        console.log(result);
        const fetchData = async () => {
            try {
              // POST 요청을 통해 서버에 로그인 정보 전송
              const response = await axios.post(
                // '/app/users/login/',
                '/app/chain/aianalyzelist/aianalyzeresult/', 
                //'/app/drugs/detail/',
                {
                    params: {
                      token: token,
                      customer_drugs : result
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
        location.href = '/aianalyzelist/aianalyzeprocess';
    };

    return (
        <>
            <IncHeader titles="복용중인 약" urls="/analyze/results" />
            <div className="p-5 flex items-center text-s">
                <p>1일 섭취량을 바꾸고 싶어요</p>
                <CustomSwitch onChange={handleSwitchChange} />
            </div>
            {/* <div className="px-5 pb-2 text-right">
                <button type="button" className="text-slate-700 hover:text-white bg-white hover:bg-blue-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg font-extrabold">삭제하기</button>
            </div> */}
            {datas && datas.map((data, index) => (
                <div key={index} className="px-5 py-2 w-full flex flex-rows">
                    <div className={`basis-1/4 ${clicked.includes(data.drug_no) ? 'bg-[#4954fb] text-white' : 'bg-[#f2f2e8] text-black'} border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                        <div className="flex flex-col items-center pb-2 pt-2">
                            <img className="w-14 h-14 mb-3 rounded-full shadow-lg" src={data.drug_img_path} alt="알약" />
                            <div className={`flex text-xs items-center ${clicked.includes(data.drug_no) ? 'text-white' : 'text-black'}`}>
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-xs w-4 h-4 css-i4bv87-MuiSvgIcon-root mr-1" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachMoneyIcon">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"></circle>
                                <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">$</text>
                            </svg> 1정 당<span className="mr-1"></span><span className="text-xs text-[#2cc65b] font-bold">{data.drug_price}</span>원
                            </div>
                        </div>
                    </div>
                    <div className="basis-2/4 px-2 text-xs items-center">
                        <p>{data.drug_illness}</p>
                        <p className="text-xl font-bold">{data.drug_name}</p>
                        <div className="flex items-center">
                            <p className="pt-2 mr-2">1일 섭취량 :</p>
                            {showSelect ? (
                                <button onClick={() => handleSelectClick(data.drug_no)} className="w-20 h-8 bg-[#dfe1fb] text-[#4954fb]">
                                    {intakeAmounts[data.drug_no] || '1개 ⏷'}
                                </button>
                            ) : (
                                <p className="pt-2 mr-2">{intakeAmounts[data.drug_no] || '1개'}</p>
                            )}
                        </div>
                    </div>
                    <div className="basis-1/4 flex items-center justify-end">
                        <button
                            onClick={() => handleChoose(data.drug_no)}
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
            ))}

            <div className="p-5 pt-10 w-full mx-auto">
                <button onClick={handleButton} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">분석할래요</button>
            </div>

            <Modal open={open} onClose={handleSelectClose}>
    <Box sx={{ ...modalStyle, borderRadius: '20px', padding: '16px' }}>
        <h2 className="font-bold text-xl text-center mb-4">하루에 총 몇 개 드세요?</h2>
        <div className="flex justify-center items-center">
            <div className="w-full h-36 overflow-y-auto snap-y snap-mandatory scrollbar-hide flex flex-col justify-start pt-4">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        className="w-full py-2 my-1 bg-transparent hover:bg-[#dfe1fb] flex items-center justify-center snap-center text-l font-bold focus:outline-none focus:bg-[#dfe1fb]"
                        onClick={() => handleSelectChange(value)}
                    >
                        {value}
                    </button>
                ))}
            </div>
        </div>
        <button
            className="w-full mt-4 py-3 bg-[#2cc65b] text-white rounded-lg font-extrabold"
            onClick={handleSelectClose}
        >
            확인
        </button>
    </Box>
</Modal>


        </>
    );
}
