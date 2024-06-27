"use client"

import IncHeader from "@/app/components/inc_header";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://211.216.177.2:15200";

export default function CameraMessage() {
    const params = useSearchParams();
    const mode = params.get("mode");
    const [imagePreview, setImagePreview] = useState(null);
    const canvasRef = useRef(null);
    const [videoElement, setVideoElement] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function handleStartCamera() {
          if (showCamera) {
            try {
              // 사용자의 동의를 얻어 카메라 스트림 가져오기
              const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      
              // 비디오 요소에 카메라 스트림 설정
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
              } else {
                console.error("비디오 요소를 찾을 수 없습니다.");
                return;
              }
            } catch (error) {
              console.error("카메라 접근 중 오류 발생:", error);
            }
          }
        }
      
        handleStartCamera();
      }, [showCamera, videoRef.current]);
      
      useEffect(() => {
        setVideoElement(videoRef.current);
      }, [videoRef]);                
    
      const handleCameraClick = () => {
        setShowCamera(!showCamera);
      };

    const handleTakePicture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setImagePreview(imageData);
    };
    //여기 까지

    // 헬퍼 함수: dataURL을 Blob으로 변환
    function dataURLtoBlob(dataURL) {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteString = atob(parts[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([uint8Array], { type: contentType });
    }
  
  const handleUpload = async e => {
    try {
        console.log(token);

        // Blob 객체로 변환
        const blobData = dataURLtoBlob(imagePreview);

        const formData = new FormData();
        // formData.append('image', imagePreview);
        formData.append('image', blobData, 'image.png');
        const response = await axios.post(
        // '/app/users/login/',
        '/app/drugs/upload/'+mode+'/', 
        //'/app/drugs/detail/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          }
        }
        );
        console.log(token);
        location.href = '/analyze?mode=' + mode
        // console.log(response.data.status_code+mode)
        // location.href = '/analyze?mode=' + mode
        if (response.data.status_code == 200) {
            // 쿠키에 token 저장
            // console.log('token = ' + response.data.token)
            // localStorage.setItem('token', response.data.token);
            Swal.fire({
              title: "로그인 성공",
              text: `${response.data.message}`,
              icon: "success",
            });
            location.href = '/analyze?mode=' + mode
        } 
    } catch (error) {
        //console.log(response.data.status_code);
        Swal.fire({
            title: "실패",
            text: "전송 오류",
            icon: "error",
        });
        location.href = '/analyze?mode=' + mode
    }
    // 분석중으로 이동
        
    };

    let titles = "";
    let urls = "";
    let imgs = "";

    if (mode == "pill") {
        titles = "알약으로 약 추가하기";
        urls = "/selectMode";
        imgs = "/assets/images/img_pill.png";
    }

    if (mode == "bag") {
        titles = "약봉투로 약 추가하기";
        urls = "/selectMode";
        imgs = "/assets/images/img_bag.png";
    }

    return (
        <>
        <IncHeader titles={titles} urls={urls} />
        <div className="p-5 w-full mx-auto flex justify-center items-center">
            <p className="">이렇게 촬영해주세요</p>
        </div>

        {showCamera ?
        ""
        :
        <>
        { mode == "pill" ? 
        <div>
            <div className="px-10">
                <img className="rounded-md" src={imgs} />
            </div>
            <div className="px-10 py-5">
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">1</p>
                    </div>
                    <p className="pl-2 text-sm">알약과 대비되는 색상의 바닥에 알약을 올려주세요.</p>
                </div>
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">2</p>
                    </div>
                    <p className="pl-2 text-sm">알약끼리 붙어있지 않게 떨어뜨려 주시고, 알약의 각인이 정면을 보도록 맞춰주세요.</p>
                </div>
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">3</p>
                    </div>
                    <p className="pl-2 text-sm">알약과 수평으로 각인이 잘 나오게 촬영해주세요.</p>
                </div>
            </div>
        </div>
        :
        <div>
            <div className="px-10">
                <img className="rounded-md" src={imgs} />
            </div>
            <div className="px-10 py-5">
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">1</p>
                    </div>
                    <p className="pl-2 text-sm">약봉투를 평평한 바닦에 정면으로 올려주세요.</p>
                </div>
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">2</p>
                    </div>
                    <p className="pl-2 text-sm">휴대폰 화면의 노란 선 안에 약 이름이 들어가도록 휴대폰을 움직이세요.</p>
                </div>
                <div className="pb-2 flex items-center">
                    <div className="w-4 h-4 flex flex-col justify-center items-center h-6 relative gap-2.5 px-2 py-0.5 rounded-[79px] bg-[#4954fb]">
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">3</p>
                    </div>
                    <p className="pl-2 text-sm">빨간 선 안에 약 이름이 모두 들어왔다면 카메라버튼을 눌러 촬영을 완료해주세요!</p>
                </div>
            </div>
        </div>
        }
        </>
        }
        

        <div>
        <label htmlFor="upload-button">
            {showCamera ? (
            <div>
                <div className="p-5 w-full mx-auto">
                    <video id="my-video" ref={videoRef} width="100%" height="100" />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    {imagePreview && <img src={imagePreview} alt="Camera Preview" />}
                    {/* <img className="rounded-lg" src={image.preview} alt="dummy" width="100%" height="100" /> */}
                </div>                
                <div className="p-10 pt-20 w-full mx-auto grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setImagePreview(null)} className="mx-auto w-full rounded-2xl h-[70px] bg-white text-xl font-bold hover:bg-[#2cc65b] text-gray-400 hover:text-gray-50">재촬영</button>
                    {imagePreview ? (
                        <button type="button" onClick={handleUpload} className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">확인</button>
                    ) : (
                        <button type="button" onClick={handleTakePicture} className="mx-auto w-full rounded-2xl h-[70px] text-xl font-bold bg-[#2cc65b] text-gray-50">찍기</button>
                        )}
                </div>
            </div>
            ) : (
            <div className="p-10 pt-20 w-full mx-auto">
                <button 
                onClick={handleCameraClick}
                className="mx-auto w-full rounded-2xl h-[70px] text-3xl font-bold text-center bg-[#2cc65b] text-gray-50">
                  촬영할게요
                </button>
            </div>
            )}
        </label>
        </div>
        </>
    )
}