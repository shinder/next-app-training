"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export default function MyAnimatePresence2({ children }) {
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        initial={{ opacity: 0, left: 800 }}
        animate={{ opacity: 1, left: 0 }}
        exit={{ opacity: 0, left: 800 }}
        key="box"
        style={{
          width: "auto",
          position: "relative",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
