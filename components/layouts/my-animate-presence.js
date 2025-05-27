"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export default function MyAnimatePresence({ children }) {
  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        key="box"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
