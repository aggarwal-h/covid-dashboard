import React from "react";

function SimpleSkeleton({ className }) {
  return (
    <div className={`skeleton-box inline-block rounded-md ${className}`}></div>
  );
}

export default SimpleSkeleton;
