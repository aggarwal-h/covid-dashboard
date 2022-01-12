import { ChevronDownIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SimpleSkeleton from "../skeletons/SimpleSkeleton";
import classnames from "classnames";

function InlineSelect({ query, country }) {
  const [selectOpen, setSelectOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const selected = country;

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

  return (
    <div
      className={classnames(
        "inline-block cursor-pointer relative z-50 py-2 px-4 bg-gray-100 dark:bg-dark-900 rounded-3xl active:scale-[100%] scale-[101%] transition-transform duration-100",
        {
          "scale-[101%]": selectOpen,
        }
      )}
      onClick={() => setSelectOpen(!selectOpen)}
      ref={ref}
    >
      <span className="capitalize">
        {selected === undefined ? (
          router.pathname === "/" ? (
            Worldwide
          ) : (
            <SimpleSkeleton className="h-7 w-56" />
          )
        ) : (
          selected
        )}
        <ChevronDownIcon
          className={classnames(
            "ml-2 w-6 h-6 inline-block transition-transform duration-100",
            {
              "rotate-180": selectOpen,
            }
          )}
        />
      </span>
      {selectOpen && (
        <div className="absolute p-1 mt-3 z-10 min-w-[13rem] w-[85%] h-72 overflow-y-scroll text-base list-none bg-white dark:bg-dark-900 rounded-2xl divide-y divide-gray-100 shadow">
          <ul className="py-1">
            <li>
              <Link href="/">
                <a
                  className={classnames(
                    "block py-2 px-4 text-base hover:bg-gray-100 dark:hover:bg-dark-700 mx-1 rounded-lg",
                    {
                      "text-blue-500": selected === "worldwide",
                      "text-gray-700 dark:text-white": selected !== "worldwide",
                    }
                  )}
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
                      className={classnames(
                        "block py-2 px-4 text-base hover:bg-gray-100 dark:hover:bg-dark-700 mx-1 rounded-lg",
                        {
                          "text-blue-500":
                            selected?.toLowerCase() === country.toLowerCase(),
                          "text-gray-700 dark:text-white":
                            selected?.toLowerCase() !== country.toLowerCase(),
                        }
                      )}
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
