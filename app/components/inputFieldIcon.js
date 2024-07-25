"use client";
import Image from "next/image";
import { useState } from "react";
import { COUNTRIES, sortCountriesByName } from "../constants/countries";

export default function InputFieldIcon({ label, type, placeholder, onChange }) {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState("us");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInput = (e) => {
    let validatedValue;

    if (type === "tel") {
      validatedValue = e.target.value.replace(/[^0-9\-]/g, "");
    } else {
      validatedValue = e.target.value;
    }
    setValue(validatedValue);
    onChange(validatedValue);
  };

  const handleCountryClick = (cca2) => {
    setCountry(cca2);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center w-full">
      <div className="absolute flex rounded-[11px] h-14">
        <div className="absolute bg-[#272A33] flex items-center justify-center rounded-[11px] w-[54px] h-14">
          <Image
            src={`https://flagpedia.net/data/flags/h80/${country}.png`}
            alt="country icon"
            width={34}
            height={24}
            objectFit="cover"
            onClick={() => setShowDropdown(!showDropdown)}
          />
        </div>

        {showDropdown && (
          <div className="absolute left-0 bg-[#111317] rounded-lg w-[200px] max-h-40 flex flex-col pt-4 z-10">
            <div className="scroll-container px-2">
              {sortCountriesByName().map((country) => {
                return (
                  <div
                    key={`div-country-${country.cca2}`}
                    onClick={() => handleCountryClick(country.cca2)}
                    className="w-full h-8 py-5 cursor-pointer flex items-center justify-start gap-2 text-xs md:text-sm"
                  >
                    <Image
                      key={country.cca2}
                      src={`https://flagpedia.net/data/flags/h80/${country.cca2}.png`}
                      alt={country.name}
                      width={32}
                      height={24}
                      objectFit="cover"
                    />

                    <h6>{country.name}</h6>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="w-full ml-[60px] h-16 pl-3 pt-3 pb-3.5 rounded-[11px] bg-[#272a33] border border-[#272a33] flex-col justify-center items-start gap-1 inline-flex">
        <div className="text-[#9396a5] text-xs md:text-sm font-normal">
          {label}
        </div>
        <input
          type={type || "text"}
          value={value}
          onChange={handleInput}
          className="w-full bg-transparent text-white text-sm md:text-base font-normal outline-none"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          inputMode="tel"
          placeholder={placeholder || ""}
        />
      </div>
      <style jsx>{`
        .scroll-container {
          overflow-y: auto;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
