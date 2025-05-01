"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import styles from "@/app/address-book/address-book.module.css";
import { useEffect, useState } from "react";

export default function FavHeart({
  checked = false,
  onClick = () => {},
  color = "red",
}) {
  const [liked, setLiked] = useState(checked);
  useEffect(() => {
    setLiked(checked);
  }, [checked]);
  return (
    <span className={styles.hearts} style={{color}} onClick={onClick}>
      {liked ? <FaHeart /> : <FaRegHeart />}
    </span>
  );
}
