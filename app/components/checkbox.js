"use client";
import Image from "next/image";
import { useState } from "react";

export default function Checkbox({ onChange }) {
  const [value, setValue] = useState(false);

  const handleCheckbox = () => {
    setValue((prevValue) => {
      const newValue = !prevValue;
      onChange(newValue);
      return newValue;
    });
  };

  const className = "hover:cursor-pointer";

  return (
    <Image
      src={value ? "/checkbox.svg" : "/checkbox_outlined.svg"}
      alt="check"
      width={34}
      height={24}
      objectFit="cover"
      onClick={() => {
        handleCheckbox();
      }}
      className={className}
    />
  );
}
