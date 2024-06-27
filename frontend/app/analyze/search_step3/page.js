"use client"

import IncHeader2 from "../../components/inc_header2";
import Swal from "sweetalert2";

export default function SearchStep3() {

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

    const handleAdd = () => {
        alert('test')
    }

    return (
        <>
        <IncHeader2 urls="/analyze/search_step2" />
        <div className="px-5 pt-2 pb-6">
            <p className="text-2xl font-bold text-slate-600">찾으시는 약을<br />선택해주세요.</p>
        </div>
        <div className="px-5 pt-4 pb-2 text-right">
            <button type="button" class="text-slate-700 hover:text-white bg-white hover:bg-blue-700 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">삭제하기</button>
        </div>

        <div className="px-5 grid grid-cols-2 gap-4">
            {datas.map((data, index) => {
                return (
                    <div key={index} class="w-full max-w-sm bg-[#f2f2e8] border border-gray-200 rounded-lg shadow hover:bg-[#4954fb] hover:text-gray-50">
                        <div class="flex flex-col items-center py-5">
                            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.images} alt="알약"/>
                            <h5 class="mb-1 text-xl font-medium">{data.names}</h5>
                            <span class="text-sm">{data.effect}</span>
                        </div>
                    </div>    
                )
            })}
        </div>

        <div className="p-5 pt-10 pb-20 w-full mx-auto">
            <button onClick={()=>{handleAdd()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-white text-gray-500 hover:bg-[#2cc65b] hover:text-gray-50 border border-gray-200">추가할께요</button>
        </div>

        </>
    )
}