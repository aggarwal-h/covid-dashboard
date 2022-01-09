import Image from "next/image";
import React from "react";
import {
  ChevronDoubleLeftIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  return (
    <div className="sidebar">
      {/* Head */}
      <div className="sidebar-head">
        <a className="sidebar-logo">
          <span className="hidden lg:block">
            <Image
              className="sidebar-pic sidebar-pic-light"
              src="/assets/img/covid_large.png"
              width="150%"
              height="100%"
              objectFit="contain"
              alt=""
            />
          </span>
          <span className="block lg:hidden">
            <Image
              className="sidebar-pic sidebar-pic-light"
              src="/assets/img/covid.svg"
              width="150%"
              height="80%"
              objectFit="contain"
              alt=""
            />
          </span>
        </a>
        <button className="mb-4 lg:mb-0">
          <ChevronDoubleLeftIcon className="text-indigo-500 w-6 h-6" />
        </button>
      </div>

      {/* Body */}
      <div className="sidebar-body">
        <nav className="sidebar-nav">
          <SidebarItem
            title="Home"
            icon={<HomeIcon />}
            to="/"
            active={router.pathname === "/"}
          />
          <SidebarItem
            title="Map"
            icon={<MapIcon />}
            to="/map"
            active={router.pathname === "/map"}
          />
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
