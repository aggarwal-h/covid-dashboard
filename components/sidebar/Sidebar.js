import Image from "next/image";
import React from "react";
import {
  ChevronDoubleLeftIcon,
  HomeIcon,
  MapIcon,
} from "@heroicons/react/outline";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Head */}
      <div className="sidebar-head">
        <a className="sidebar-logo">
          <Image
            className="sidebar-pic sidebar-pic-light"
            src="/assets/img/covid_large.png"
            width="150%"
            height="100%"
            objectFit="contain"
            alt=""
          />
        </a>
        <button>
          <ChevronDoubleLeftIcon className="text-gray-600 w-6 h-6" />
        </button>
      </div>

      {/* Body */}
      <div className="sidebar-body">
        <nav className="sidebar-nav">
          <SidebarItem title="Home" icon={<HomeIcon />} active />
          <SidebarItem title="Map" icon={<MapIcon />} />
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
