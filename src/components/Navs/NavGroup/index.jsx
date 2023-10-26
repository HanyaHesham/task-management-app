import React, { useEffect, useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
export default function NavItemGroup({
  icon,
  title,
  children,
  active = false,
  ...restProps
}) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(active);
  }, [active]);
  return (
    <ul
      className="nav-group"
      {...restProps}
      style={{ height: !toggle && "20px" }}
    >
      <li onClick={() => setToggle(!toggle)} className="nav-group-item">
        <div>
          <span style={{ marginInlineEnd: "5px" }}>{icon}</span>
          <span>{title}</span>
        </div>
        {!toggle ? <DownOutlined /> : <UpOutlined />}
      </li>
      <ul className={`${!toggle ? "sub-menu" : "collapsed"}`}>{children}</ul>
    </ul>
  );
}
