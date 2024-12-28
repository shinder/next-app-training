import { useEffect, useState, useRef } from "react";

export default function CleanupChild3() {
  const [count, setCount] = useState(0);

  console.log("CleanupChild 3");

  useEffect(() => {
    console.log("CleanupChild 3: 已掛載");
    return () => {
      console.log("CleanupChild 3: 將要卸載");
    };
  }, []);

  useEffect(() => {
    console.log("CleanupChild 3: didUpdate");
    return () => {
      console.log("CleanupChild 3: didUpdate cleanup");
    };
  }, [count]);

  return (
    <div>
      <h2>CleanupChild 3 </h2>
      <p>
        <button
          onClick={() => {
            setCount((old) => old + 1);
          }}
        >
          click
        </button>
      </p>
      <p>{count}</p>
    </div>
  );
}
