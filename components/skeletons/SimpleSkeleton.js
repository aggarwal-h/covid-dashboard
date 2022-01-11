import React from "react";

function SimpleSkeleton({ className }) {
  return (
    <span
      className={`skeleton-box inline-block rounded-md ${className}`}
    ></span>
  );
}

export default SimpleSkeleton;
