import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={classnames(
        "fixed sm:hidden top-0 left-0 right-0 h-16 z-50 border-gray-200 py-2.5",
        {
          "rounded-t-3xl bg-gray-50 dark:bg-dark-900": open,
          "rounded bg-white dark:bg-dark-800": !open,
        }
      )}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto px-6">
        <Link href="/">
          <a>
            <Image
              src="/assets/img/covid.svg"
              width="50%"
              height="40%"
              objectFit="contain"
              alt="COVID-dashboard-picture-svg"
              priority={true}
            />
          </a>
        </Link>
        <button onClick={() => setOpen((open) => !open)}>
          {open ? (
            <XIcon className="w-6 h-6 dark:text-white" />
          ) : (
            <MenuAlt3Icon className="w-6 h-6 dark:text-white" />
          )}
        </button>
      </div>
      <div
        className={classnames(
          "w-full bg-gray-50 dark:bg-dark-900 px-10 pt-2 pb-6 rounded-3xl",
          {
            "hidden rounded-2xl": !open,
            "block shadow-xl": open,
          }
        )}
      >
        <ul className="flex flex-col">
          <NavbarListItem href="/" title="Home" />
          <NavbarListItem href="/map" title="Maps" />
        </ul>
      </div>
    </nav>
  );
}

function NavbarListItem({ href, title }) {
  const router = useRouter();
  return (
    <li>
      <Link href={href}>
        <a
          className={classnames("block rounded-xl p-3 mt-2", {
            "bg-blue-600 text-white": router.pathname === href,
            "bg-gray-100 dark:bg-dark-700 dark:text-white":
              router.pathname !== href,
          })}
        >
          {title}
        </a>
      </Link>
    </li>
  );
}

export default Navbar;
