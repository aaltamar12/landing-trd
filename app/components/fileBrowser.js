"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function FileBrowser({ setLoadedFiles }) {
  const [files, setFiles] = useState([]);
  const [porcentajeCarga, setPorcentajeCarga] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);

    if (files.length + selected.length > 4) {
      alert("Solo puedes cargar hasta 4 archivos.");
      return;
    }

    const newFiles = [...files, ...selected];
    e.target.value = "";
    setFiles(newFiles);
  };

  const handleRemoveFile = (fileName) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };

  useEffect(() => {
    if (porcentajeCarga === 100) {
      setCargando(false);
    }
  }, [porcentajeCarga]);

  useEffect(() => {
    setLoadedFiles && setLoadedFiles(files);
  }, [files]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[#9396A5] text-base md:text-xl">
        Carga hasta 4 imágenes para tu perfil
      </h1>
      <div
        className={`md:h-[75px] flex-col justify-start items-start gap-2 inline-flex relative ${
          cargando ? "hidden" : "flex"
        }`}
      >
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".jpg, .png, .tiff, .pdf, .zip"
          disabled={cargando || files.length >= 4}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer bg-pink-300"
        />
        <div className="flex w-full p-4 bg-[#272a33] rounded-[11px] border border-[#272a33] items-start gap-2">
          <div className="flex items-start justify-start">
            <Image
              key={"inbox"}
              src="/direct-inbox.svg"
              alt="direct inbox"
              width={32}
              height={32}
              className="w-14 h-14 md:w-8 md:h-8"
            />
          </div>
          <div className="w-[623px] flex-col justify-center items-start gap-1.5 inline-flex">
            <div className="self-stretch text-white text-sm md:text-base font-medium">
              Haz clic o arrastra los archivos a esta área para cargarlo
            </div>
            <div className="self-stretch text-[#9396a5] text-xs font-normal font-['Helvetica Neue']">
              JPG, PNG, Tiff, hasta 2 mb
            </div>
          </div>
        </div>
      </div>
      {cargando ? (
        <div className="md:h-[75px] relative bg-transparent overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
              porcentajeCarga > 50 ? "from-cyan-400" : "from-rose-400"
            } ${
              porcentajeCarga > 50 ? "via-rose-400" : "via-orange-400"
            } to-orange-400`}
            style={{ width: `${porcentajeCarga}%` }}
          />
        </div>
      ) : (
        ""
      )}
      {!cargando && files.length > 0 && (
        <div className="mt-4 text-[#9396a5] text-xs bg-gradient-to-r from-cyan-400 via-rose-400 to-orange-400 p-0.5">
          <div className="bg-[#272a33] p-4">
            <div className="flex flex-col gap-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex justify-between items-center"
                >
                  <span className="">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.name)}
                    className="cursor-pointer hover:text-orange-500/50"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
