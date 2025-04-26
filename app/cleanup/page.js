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
      <div className="mt-3">
        <button
          className={`btn btn-${showChild ? "warning" : "success"}`}
          onClick={() => setShowChild(!showChild)}
        >
          {showChild ? "點擊「隱藏」" : "點擊「顯示」"}
        </button>
      </div>
      {showChild && <CleanupChild1 />}
      <hr />
      {/* {showChild && <CleanupChild2 />} */}
      <hr />
      {/* {showChild && <CleanupChild3 />} */}
    </div>
  );
}
