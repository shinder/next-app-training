// components/cleanup-child2.js
"use client";
import { useEffect, useState, useRef } from "react";

export default function CleanupChild2() {
  const myRef = useRef();
  let n = 0; // 此元件沒有更新 (re-render)
  useEffect(() => {
    console.log("CleanupChild2 已掛載");
    const interval_id = setInterval(() => {
      n++;
      myRef.current.innerHTML = n;
    }, 500);
    return () => {
      console.log("CleanupChild2 將要卸載");
      clearInterval(interval_id); // 把計時器停下來
    };
  }, []);
  return (
    <div>
      CleanupChild2 <span ref={myRef}>0</span>
    </div>
  );
}
