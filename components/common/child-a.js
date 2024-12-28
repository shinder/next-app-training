// components/common/child-a.js
"use client";
export default function ChildA({ name = "" }) {
  console.log({ name });

  return <div>ChildA: {name}</div>;
}
