import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ icon, title, ...restProps }) {
  return (
    <NavLink className="nav-item" {...restProps}>
      <span style={{ marginInlineEnd: "5px" }}>{icon}</span>
      <span>{title}</span>
    </NavLink>
  );
}
