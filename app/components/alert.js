"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Alert({ message = "", isLoading, isVisible, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible && !isLoading) {
      setVisible(true);
      timer = setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setVisible(false);
    }

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-[-8px] left-1/2 transform -translate-x-1/2 transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-12" : "-translate-y-full"
      } w-[510px] h-[35px] px-4 py-2 bg-[#27ae60] rounded-lg flex justify-between items-center`}
    >
      <div className="text-center text-white text-base font-normal font-['SF Pro Display']">
        {message}
      </div>
      <div className="w-4 h-4 p-[1.33px] flex justify-center items-center">
        <Image
          src="/check_circle.svg"
          alt="check circle"
          width={13}
          height={13}
        />
      </div>
    </div>
  );
}
