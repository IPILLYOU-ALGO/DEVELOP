"use client"

import IncHeader from "@/app/components/inc_header";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function AiAnalizeResult() {
    const handleButton = () => {
        location.href = '/aianalyzelist/aianalyzeinfo'
    }
    // 나중에 데이터로 처리
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

    return(
        <>
        <IncHeader titles="복용중인 약" urls="/" />
        <div className="px-5 pt-2">
            <p className="text-2xl font-bold text-slate-600">같이 드시면 안돼요</p>
            <p className="text-sm text-slate-600">약 간 상호작용 충돌로 부작용이 생길 수 있어요.</p>
        </div>
        <div className="p-5">
            <div class="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col items-center">
                    <div class="flex flex-row w-full px-5 pt-5">
                        <div className="w-full h-full flex flex-col basis-1/2 text-center">
                            <div className="w-full h-full flex justify-center">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://www.vitatra.com/webdata/goods_images/272/47272/origin0_ZOOM.jpg?v=1689811365" alt="image"/>
                            </div>
                            <span class="text-sm text-gray-500 dark:text-gray-400">주성분</span>
                            <h5 class="mb-1 font-bold text-gray-900 dark:text-white">자밀라네팜</h5>
                        </div>
                        <div className="basis-1/6 flex items-center justify-center">
                            <p className="text-[#2CC65B] text-2xl font-bold">x</p>
                        </div>
                        <div className="w-full h-full flex flex-col basis-1/2 text-center">
                            <div className="w-full h-full flex justify-center">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://www.vitatra.com/webdata/goods_images/272/47272/origin0_ZOOM.jpg?v=1689811365" alt="image"/>
                            </div>
                            <span class="text-sm text-gray-500 dark:text-gray-400">주성분</span>
                            <h5 class="mb-1 font-bold text-gray-900 dark:text-white">자밀라네팜</h5>
                        </div>
                    </div>
                    <div className="p-5">
                        <hr className="w-full" />
                        <div class="flex mt-4">
                        같이 먹으면 안되는 이유 같이 먹으면 안되는 이유같이 먹으면 안되는 이유같이 먹으면 안되는 이유같이 먹으면 안되는 이유같이 먹으면 안되는 이유같이 먹으면 안되는
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-5 pt-2 pb-2">
            <p className="text-2xl font-bold text-slate-600">같은 효과, 저렴하게 약사기</p>
            <p className="text-sm text-slate-600">내 섭취량 기준, 일주일 처방시 비교 가격이에요</p>
        </div>

        <div className="px-5 py-2 w-full flex flex-rows">
            <div className="basis-1/4 ">
                <div className="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-2 pt-2">
                        <img className="w-14 h-14 mb-3 rounded-full shadow-lg" src="https://d83r1jteficfv.cloudfront.net/merchandises/307/main-images/GOfiIUpkpQ9Z5pEacr3is.jpg?w=630&h=630&q=80" alt="알약"/>
                        <div className='flex text-xs items-center'>
                            <AttachMoneyIcon className='text-xs text-slate-700 w-3 h-3' /> <span className="text-xs">3,370</span>원
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-2/4 px-2 text-sm items-center">
                <p>신장, 결석치료</p>
                <p className="text-2xl font-bold text-slate-500">자밀라네팜</p>
                <div className="flex items-center">
                    <p className="pt-2 mr-2">1일 섭취량 : 1개</p>
                </div>
            </div>
            <div className="basis-1/4 flex items-center justify-end">
                <PlayCircleFilledIcon />
            </div>
        </div>

        <div className="p-5">
            <div className="flex py-4">
                <div className="w-1/2">
                <span className="p-1 rounded-md text-sm bg-slate-300 mx-auto">전문의약품</span>
                <p className="text-xl font-bold">자밀라네팜</p>
                </div>
                <div className="w-1/2 flex justify-end items-center font-bold text-slate-600">
                <p className="text-[#2cc65b]">500</p>원 저렴 <PlayCircleFilledIcon />
                </div>
            </div>
            <hr className="w-full" />

            <div className="flex py-4">
                <div className="w-1/2">
                <span className="p-1 rounded-md text-sm bg-slate-300 mx-auto">전문의약품</span>
                <p className="text-xl font-bold">자밀라네팜</p>
                </div>
                <div className="w-1/2 flex justify-end items-center font-bold text-slate-600">
                <p className="text-[#2cc65b]">500</p>원 저렴 <PlayCircleFilledIcon />
                </div>
            </div>
            <hr className="w-full" />

            <div className="flex py-4">
                <div className="w-1/2">
                <span className="p-1 rounded-md text-sm bg-slate-300 mx-auto">전문의약품</span>
                <p className="text-xl font-bold">자밀라네팜</p>
                </div>
                <div className="w-1/2 flex justify-end items-center font-bold text-slate-600">
                <p className="text-[#2cc65b]">500</p>원 저렴 <PlayCircleFilledIcon />
                </div>
            </div>
            <hr className="w-full" />
        </div>

        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button onClick={()=>{handleButton()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">결과저장하기</button>
        </div>
        </>
    )
}