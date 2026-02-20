import React from "react";
import { useLazyImage } from "../hooks/useLazyImage";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyMzNkMzYiLz48L3N2Zz4=",
  ...props
}) => {
  const { imgRef, isLoaded, handleLoad, shouldLoad } = useLazyImage(src);

  return (
    <img
      ref={imgRef}
      src={shouldLoad ? src : placeholder}
      onLoad={handleLoad}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        backgroundColor: "#233d36",
      }}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default LazyImage;
