// components/cleanup-child1.js
"use client";
import { useEffect, useState } from "react";

export default function CleanupChild1() {
  const [num, setNum] = useState(0); // 使用狀態
  useEffect(() => {
    console.log("CleanupChild-1: 已掛載");
    let n = 0;
    const interval_id = setInterval(() => {
      n++;
      console.log(n);
      setNum(n);
    }, 500);

    return () => {
      console.log("CleanupChild-1: 將要卸載");
      clearInterval(interval_id);
    };
  }, []);

  return <div>CleanupChild-1: {num}</div>;
}
