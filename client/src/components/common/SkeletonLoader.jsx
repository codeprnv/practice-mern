import React from "react";

const SkeletonLoader = ({ height, width }) => {
  const dynamicStyles = {
    height: typeof height === "number" ? `${height}vh` : height || "100%",
    width: typeof width === "number" ? `${width}vw` : width || "100%",
  };

  return (
    <div
      className="h-full w-full flex-shrink-0 animate-pulse overflow-hidden rounded-2xl bg-gray-800"
      style={dynamicStyles}
    />
  );
};


export default SkeletonLoader;
