// *** 2-1 **** components/cleanup-child3.js
"use client";
import { useEffect, useState } from "react";

export default function CleanupChild3() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("CleanupChild-3: 已掛載");
    return () => {
      console.log("CleanupChild-3: 將要卸載");
    };
  }, []);

  // *** 2-2 **** components/cleanup-child3.js
  useEffect(() => {
    console.log("CleanupChild-3: [count 已更新] + [已掛載]");
    return () => {
      console.log("CleanupChild-3: [清除上次 count 更新時的設定] + [將要卸載]");
    };
  }, [count]);

  return (
    <div>
      <h2>CleanupChild-3</h2>
      <p>
        <button onClick={() => setCount(count + 1)}>click</button>
      </p>
      <p>{count}</p>
    </div>
  );
}
