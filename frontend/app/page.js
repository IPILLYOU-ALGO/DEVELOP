"use client"

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {

  useEffect(() => {
    redirect('/main')
  }, []);

  return (
    <>
    메인으로 이동합니다.
    </>
  );
}
