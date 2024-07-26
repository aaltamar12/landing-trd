"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gallery({ images }) {
  const [indexImage, setIndexImage] = useState(0);
  const [urlImage, setUrlImage] = useState((images && images[0]) || "");

  const isMultipleImages = images && images.length === 1 ? false : true;

  const buttonsClass =
    "w-6 h-6 pl-2 pr-2.5 pt-1.5 pb-2 justify-center items-center flex hover:cursor-pointer";

  const imageHandler = (action) => {
    if (!images) return;
    if (indexImage === 0 && action === "back") return;

    if (action === "next") {
      indexImage < images.length - 1 ? setIndexImage(indexImage + 1) : null;
    } else if (action === "back") {
      setIndexImage(indexImage - 1);
    }
  };

  const renderDots = () => {
    let dots = [];

    if (images) {
      for (let index = 0; index < images.length - 1; index++) {
        dots.push(
          <Image
            key={"dot" + index}
            src="/dot.svg"
            alt="arrow left"
            width={11}
            height={11}
            objectFit="cover"
            className="w-6 h-6 pl-2 pr-2.5 pt-1.5 pb-2 justify-center items-center flex hover:cursor-pointer"
          />
        );
      }
    }

    return dots;
  };

  useEffect(() => {
    images && setUrlImage(images[indexImage]);
  }, [indexImage]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <Image
          src={urlImage || "/sample_image.png"}
          alt="user image"
          width={620}
          height={504}
          objectFit="contain"
          className="w-full h-auto rounded-[20px]"
        />
      </div>
      <div className="h-[35px] bg-[#4b4b4b]/40 rounded-3xl flex items-center">
        <div className="flex justify-between py-[5.5px] px-2">
          {isMultipleImages && (
            <Image
              key="previous_arrow"
              src="/arrow_left.svg"
              alt="arrow left"
              width={11}
              height={11}
              objectFit="cover"
              className={buttonsClass}
              onClick={() => imageHandler("back")}
            />
          )}

          <Image
            key="dot00"
            src="/dot_filled.svg"
            alt="arrow left"
            width={11}
            height={11}
            objectFit="cover"
            className={buttonsClass}
          />

          {!isMultipleImages ? null : renderDots()}

          {isMultipleImages && (
            <Image
              key="next_arrow"
              src="/arrow_right.svg"
              alt="arrow right"
              width={11}
              height={11}
              objectFit="cover"
              className={buttonsClass}
              onClick={() => imageHandler("next")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
