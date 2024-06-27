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