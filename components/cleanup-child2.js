// components/cleanup-child2.js
"use client";
import { useEffect, useState, useRef } from "react";

export default function CleanupChild2() {
  const myRef = useRef(); // myRef.current 綁定對應的 DOM 元素

  console.log("CleanupChild-2");

  useEffect(() => {
    console.log("CleanupChild-2: 已掛載");
    let n = 0;
    const interval_id = setInterval(() => {
      n++;
      console.log(n);
      if (myRef.current) myRef.current.innerHTML = n;
    }, 500);

    return () => {
      console.log("CleanupChild-2: 將要卸載");
      clearInterval(interval_id);
    };
  }, []);

  return (
    <div>
      CleanupChild-2: <span ref={myRef}></span>
    </div>
  );
}
