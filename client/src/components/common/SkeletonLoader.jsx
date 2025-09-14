import React from 'react';

const SkeletonLoader = ({ height, width, className = '' }) => {
   const dynamicStyles = {
      height: typeof height === 'number' ? `${height}vh` : height || '100%',
      width: typeof width === 'number' ? `${width}vw` : width || '100%',
   };

   return (
      <div
         style={dynamicStyles}
         className={`animate-pulse rounded-lg bg-gray-800 ${className}`}
      >
         {/* This div will be the visible skeleton */}
      </div>
   );
};

export default SkeletonLoader;
