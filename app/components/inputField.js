"use client";

import { useState } from "react";

export default function InputField({
  label,
  value,
  type,
  placeholder,
  onChange,
}) {
  return (
    <div className="w-full h-16 px-4 pt-3 pb-3.5 rounded-xl bg-[#272a33] border border-[#272a33] flex-col justify-center items-start gap-1 inline-flex">
      <div className="text-[#9396a5] text-sm font-normal">{label}</div>
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-white text-base font-normal outline-none"
        placeholder={placeholder || ""}
      />
    </div>
  );
}
