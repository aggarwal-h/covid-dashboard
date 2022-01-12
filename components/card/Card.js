import React from "react";
import classnames from "classnames";

export default function Card({ className, children }) {
  return (
    <div
      className={classnames(
        "relative flex-[0_0_100%] max-w-full rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,7%)] mx-4 mt-8 dark:bg-dark-700",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div
      className={classnames(
        "flex justify-between p-6 border-b-1 border-gray-200 dark:border-gray-600",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return (
    <div className={classnames("px-2 sm:px-4 md:px-6 p-6", className)}>
      {children}
    </div>
  );
}
