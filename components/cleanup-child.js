import { useEffect, useState } from "react";

export default function CleanupChild() {
  const [num, setNum] = useState(0);
  console.log("CleanupChild 1");

  useEffect(() => {
    console.log("CleanupChild: 已掛載");
    let n = 0;
    const interval_id = setInterval(() => {
      n++;
      console.log(n);
      setNum(n);
    }, 500);

    return () => {
      console.log("CleanupChild: 將要卸載");
      clearInterval(interval_id);
    };
    
  }, []);

  return <div>CleanupChild 1 {num}</div>;
}
