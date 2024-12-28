// app/render-try1/page.js
"use client";
import React, { useState } from "react";
import ChildA from "@/components/common/child-a";

export default function RenderTry1() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>click</button>
      <br />
      <ChildA name="第一個" />
      <ChildA name={`sec: ${count}`} />
    </div>
  );
}
