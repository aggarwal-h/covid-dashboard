import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

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
        <Skeleton width={200} />
      </span>
    );
  }
  return (
    <div
      className="inline-block cursor-pointer relative"
      onClick={() => setSelectOpen(!selectOpen)}
      ref={ref}
    >
      <span className="capitalize">{selected || "Worldwide"}</span>
      {selectOpen && (
        <div className="absolute p-1 top-12 z-10 w-52 h-72 overflow-y-scroll text-base list-none bg-white rounded divide-y divide-gray-100 shadow">
          <ul className="py-1">
            <li>
              <Link href="/">
                <a
                  className={`block py-2 px-4 text-base hover:bg-gray-100 mx-1 rounded-lg ${
                    !selected ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  Worldwide
                </a>
              </Link>
            </li>
            {query.data.map((country) => {
              return (
                <li key={country.country_name}>
                  <Link href={`/${country.country_name}`}>
                    <a
                      className={`block py-2 px-4 text-base hover:bg-gray-100 mx-1 rounded-lg ${
                        selected?.toLowerCase() ===
                        country.country_name.toLowerCase()
                          ? "text-blue-500"
                          : "text-gray-700"
                      }`}
                    >
                      {country.country_name}
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
