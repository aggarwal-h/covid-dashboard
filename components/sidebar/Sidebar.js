import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ChevronDoubleLeftIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import Cookie from "js-cookie";

function Sidebar({ initialSidebarMinimized }) {
  const router = useRouter();
  const [minimized, setMinimized] = useState(() =>
    JSON.parse(initialSidebarMinimized || false)
  );
  useEffect(() => {
    Cookie.set("sidebarMinimized", JSON.stringify(minimized));
  }, [minimized]);
  return (
    <div className={`sidebar ${minimized ? "sidebar-minimized" : ""}`}>
      {/* Head */}
      <div className="sidebar-head">
        <Link href="/">
          <a className="sidebar-logo">
            <span className="hidden lg:block" id="covid-large-img">
              <Image
                className="sidebar-pic sidebar-pic-light"
                src="/assets/img/covid_large.png"
                width="180%"
                height="100%"
                objectFit="contain"
                alt="COVID-dashboard-picture-large"
              />
            </span>
            <span className="block lg:hidden" id="covid-small-img">
              <Image
                className="sidebar-pic sidebar-pic-light"
                src="/assets/img/covid.svg"
                width="150%"
                height="80%"
                objectFit="contain"
                alt="COVID-dashboard-picture-svg"
              />
            </span>
          </a>
        </Link>
      </div>

      {/* Body */}
      <div className="sidebar-body">
        <nav className="sidebar-nav">
          <SidebarItem
            title="Home"
            icon={<HomeIcon className="w-6 h-6" />}
            to="/"
            active={router.pathname === "/"}
          />
          <SidebarItem
            title="Map"
            icon={<MapIcon className="w-6 h-6" />}
            to="/map"
            active={router.pathname === "/map"}
          />
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex justify-center">
        <button
          className="mb-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg lg:mb-0 hidden lg:block"
          onClick={() => setMinimized(!minimized)}
        >
          <ChevronDoubleLeftIcon
            className={classnames(
              "text-indigo-500 w-6 h-6 transition-transform duration-200",
              {
                "rotate-180": minimized,
              }
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
