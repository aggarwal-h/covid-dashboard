import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SimpleSkeleton from "../skeletons/SimpleSkeleton";

function InlineSelect({ query }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const selected = router.query.country;

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  if (query.isLoading) {
    return (
      <span className="inline-block">
        <SimpleSkeleton className="h-7 w-56" />
      </span>
    );
  }
  return (
    <div
      className="inline-block cursor-pointer relative z-50"
      onClick={() => setSelectOpen(!selectOpen)}
      ref={ref}
    >
      <span className="capitalize">
        {selected === undefined ? (
          router.pathname === "/" ? (
            "Worldwide"
          ) : (
            <SimpleSkeleton className="h-7 w-56" />
          )
        ) : (
          selected
        )}
      </span>
      {selectOpen && (
        <div className="absolute p-1 top-12 z-10 w-52 h-72 overflow-y-scroll text-base list-none bg-white dark:bg-dark-900 rounded-2xl divide-y divide-gray-100 shadow">
          <ul className="py-1">
            <li>
              <Link href="/">
                <a
                  className={`block py-2 px-4 text-base hover:bg-gray-100 dark:hover:bg-dark-700 mx-1 rounded-lg ${
                    !selected
                      ? "text-blue-500"
                      : "text-gray-700 dark:text-white"
                  }`}
                >
                  Worldwide
                </a>
              </Link>
            </li>
            {query.data.map((country) => {
              return (
                <li key={country}>
                  <Link href={`/${country}`}>
                    <a
                      className={`block py-2 px-4 text-base hover:bg-gray-100 dark:hover:bg-dark-700 mx-1 rounded-lg ${
                        selected?.toLowerCase() === country.toLowerCase()
                          ? "text-blue-500"
                          : "text-gray-700 dark:text-white"
                      }`}
                    >
                      {country}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InlineSelect;
