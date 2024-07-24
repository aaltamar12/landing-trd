"use client";
import Image from "next/image";

export default function FormFieldIcon({ label, value, country = "us" }) {
  return (
    <div className="flex items-center w-full">
      <div className="absolute bg-[#272A33] flex items-center justify-center rounded-[11px] w-[54px] h-14">
        <Image
          src={`https://flagpedia.net/data/flags/h80/${country}.png`}
          alt="country icon"
          width={34}
          height={24}
          objectFit="cover"
        />
      </div>
      <div className="w-full ml-[60px] h-16 pl-3 pt-3 pb-3.5 rounded-[11px] border border-[#272a33] flex-col justify-center items-start gap-1 inline-flex">
        <div className="text-[#9396a5] text-sm font-normal">{label}</div>
        <div className="text-white text-base font-normal">{value}</div>
      </div>
    </div>
  );
}
