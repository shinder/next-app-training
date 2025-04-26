// app/cleanup/page.js
"use client";
import { useState } from "react";
import CleanupChild1 from "@/components/cleanup-child1";
import CleanupChild2 from "@/components/cleanup-child2";
import CleanupChild3 from "@/components/cleanup-child3";

export default function Cleanup() {
  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setShowChild(!showChild)}>show or hide</button>
      </div>
      {showChild && <CleanupChild1 />}
      <hr />
      {/* {showChild && <CleanupChild2 />} */}
      <hr />
      {/* {showChild && <CleanupChild3 />} */}
    </div>
  );
}
