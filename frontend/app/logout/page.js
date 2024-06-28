////////////////////////////////////////
// 개발자 : 이승주(joo4123)
// 기간 : 2024.06.19-2024.06.25
// 구현기능 : 로그아웃 구현
////////////////////////////////////////
"use client"

import { useEffect } from "react";

export default function Logout() {

    useEffect(() => {
        localStorage.setItem('token', '');
        location.href = '/'
    }, []);
    
    return (
        <>
        로그아웃 되었습니다.
        </>
    )
}