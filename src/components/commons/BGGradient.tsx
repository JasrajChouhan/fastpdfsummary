import React from 'react';

const BGGradient = () => {
  return (
    <div className="absolute inset-0 z-[-1]">
      <div
        className="w-full h-full bg-gradient-to-r from-blue-800 via-teal-500 to-purple-600 
        clip-path-polygon lg:clip-path-polygon-md sm:clip-path-polygon-xs"
      ></div>
    </div>
  );
};

export default BGGradient;
