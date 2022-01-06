import React from "react";

function SidebarItem({ title, icon, active }) {
  return (
    <a className={`sidebar-item ${active ? "active" : ""}`}>
      <div className="sidebar-icon">{icon}</div>
      <div className="sidebar-text">{title}</div>
    </a>
  );
}

export default SidebarItem;
