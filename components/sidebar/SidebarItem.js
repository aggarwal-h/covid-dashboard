import Link from "next/link";
import React from "react";

function SidebarItem({ title, icon, active, to }) {
  return (
    <Link href={to}>
      <a className={`sidebar-item ${active ? "active" : ""}`}>
        <div className="sidebar-icon">{icon}</div>
        <div className="sidebar-text">{title}</div>
      </a>
    </Link>
  );
}

export default SidebarItem;
