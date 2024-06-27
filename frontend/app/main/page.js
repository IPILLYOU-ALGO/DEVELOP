"use client"

export default function Main() {
    const handleLogin = () => {
        location.href = '/login'
    }

    const handleRegister = () => {
        location.href = '/register'
    }

    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
        location.href = '/selectMode'
    }
    

    return (
        <>
        <div className="" style={{
            backgroundImage: `url('/assets/images/main_bg.png')`,
            backgroundPosition: "center", // 이미지 위치
            backgroundSize: "cover", // 이미지 꽉차게
            backgroundRepeat: 'no-repeat', // 이미지 반복 지정
  		    width:'100%' // 배경이미지 크기
            }}>

            <div className="pt-4 w-full h-screen overflow-hidden">
                <div className="flex w-full justify-center">
                    <img src="/assets/images/logo.png" />
                </div>

                <div className="p-10">
                    <p className="pb-6 font-bold text-5xl text-white">매일 먹는</p>
                    <div className="flex">
                        <p className="font-bold text-5xl text-white">내 약</p>
                        <img className="h-12 w-13" src="/assets/images/img_al.png" />
                    </div>
                </div>

                <div className="p-10">
                    <p className="pb-6 font-bold text-5xl text-white text-right">이제</p>                
                    <p className="pb-6 font-bold text-5xl text-white text-right">알고 먹자</p>                
                </div>

                <div className="px-10 pt-10 w-full mx-auto">
                    <div className="flex justify-center">
                        <img className="" src="/assets/images/img_main_tip.png" />
                    </div>
                    <button onClick={()=>{handleLogin()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">로그인</button>
                </div>

                <div className="px-10 pt-3 w-full mx-auto">
                    <button onClick={()=>{handleRegister()}} type="button" className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-white text-gray-800">회원가입</button>
                </div>

            </div>


        </div>
        </>
    )
}