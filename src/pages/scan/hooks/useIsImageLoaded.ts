import { useState } from "react";
import { useEffectOnce } from "react-use";

export const useIsImageLoaded = (src: string) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffectOnce(() => {
    const img = new Image();
    img.src = src;

    const setIsImageLoaded = () => setIsImageLoading(false);
    img.addEventListener("load", setIsImageLoaded);

    return () => {
      img.removeEventListener("load", setIsImageLoaded);
    };
  });

  return isImageLoading;
};
