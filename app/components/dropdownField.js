"use client";

import Image from "next/image";
import { useState } from "react";

export default function DropdownField({
  label,
  options,
  placeholder,
  onChange,
}) {
  const [value, setValue] = useState("");

  const handleDropdown = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-16 px-4 pt-3 pb-3.5 rounded-xl bg-[#272a33] border border-[#272a33] flex-col justify-center items-start gap-1 inline-flex">
      <div className="text-[#9396a5] text-xs md:text-sm font-normal">
        {label}
      </div>
      <select
        value={value}
        onChange={handleDropdown}
        className="w-full bg-transparent text-[#9396A5] text-sm md:text-base font-normal outline-none border border-[#272a33] rounded-lg hover:cursor-pointer"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
