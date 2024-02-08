import React from "react";
import Image from "next/image";
import mainBg from "@/assets/img/main-background.png";

const BackgroundImage = ({
  src = mainBg.src,
  blurDataURL = mainBg.blurDataURL,
  placeholder = "blur",
  priority = true,
  quality = 100,
  fill = true,
  alt = "blue gray gradient",
}) => {
  return (
    <Image
    className="-z-10"
      src={src}
      blurDataURL={blurDataURL}
      placeholder={placeholder}
      priority={priority}
      quality={quality}
      fill={fill}
      alt={alt}
    />
  );
};

export default BackgroundImage;
