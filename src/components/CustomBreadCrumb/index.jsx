import React from "react";
import { Breadcrumb } from "antd";
import { NavLink, useLocation, useMatches } from "react-router-dom";

export default function CustomBreadCrumb() {
  const location = useLocation();
  const matches = useMatches();

  const bread_crumb = matches.find(
    (match) => match.pathname == location.pathname
  );

  return (
    <Breadcrumb separator={"|"}>
      {bread_crumb.handle &&
        bread_crumb.handle.breadCrumb.map(
          ({ title, to, ...restProps }, index) => (
            <Breadcrumb.Item
              as={to ? NavLink : "span"}
              to={to}
              key={index}
              {...restProps}
            >
              {title}
            </Breadcrumb.Item>
          )
        )}
    </Breadcrumb>
  );
}
