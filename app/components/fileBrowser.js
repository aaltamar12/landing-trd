"use client";
import Image from "next/image";

export default function FileBrowser({ label, value }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#9396A5] text-xl">
        Carga hasta 4 imágenes para tu perfil
      </h1>
      <div className="h-[75px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="flex w-full h-[75px] p-4 bg-[#272a33] rounded-[11px] border border-[#272a33] items-start gap-2">
          <div className="flex items-start justify-start">
            <Image
              key={"inbox"}
              src="/direct-inbox.svg"
              alt="direct inbox"
              width={32}
              height={32}
            />
          </div>
          <div className="w-[623px] flex-col justify-center items-start gap-1.5 inline-flex">
            <div className="self-stretch text-white text-base font-medium font-['Helvetica Neue']">
              Haz clic o arrastra los archivos a esta área para cargarlo
            </div>
            <div className="self-stretch text-[#9396a5] text-sm font-normal font-['Helvetica Neue']">
              JPG, PNG, Tiff, hasta 2 mb
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
