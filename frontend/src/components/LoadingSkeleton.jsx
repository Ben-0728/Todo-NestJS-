import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-200 animate-pulse p-4 rounded-lg mb-2">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;