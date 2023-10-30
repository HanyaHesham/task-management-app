import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme, Button } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import NavItem from "../Navs/NavItem";
import NavItemGroup from "../Navs/NavGroup";
import CustomBreadCrumb from "../CustomBreadCrumb";
import cookie from "js-cookie";

const { Header, Sider, Content, Footer } = Layout;

function AppBar({ expand, onChange, drawerWidth }) {
  const token = cookie.get("token");
  const location = useLocation();
  const navigate = useNavigate();

  const headerStyle = {
    width: expand ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 2rem)`,
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      title: "Home",
      path: "/",
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      title: "About us",
      path: "/about",
    },
    {
      key: "/tasks/record",
      icon: <FileOutlined />,
      title: "Tasks",
      activeRoutes: ["/tasks/record", "/tasks/all-tasks", "/tasks/add"],
      children: [
        {
          key: "/tasks/record",
          icon: <FileOutlined />,
          title: "Record",
          path: "/tasks/record",
        },
        {
          key: "/tasks/all-tasks",
          icon: <FileOutlined />,
          title: "All Tasks",
          path: "/tasks/all-tasks",
        },
        {
          key: "/tasks/add",
          icon: <PlusCircleOutlined />,
          title: "Add",
          path: "/tasks/add",
        },
      ],
    },
  ];

  const handleLogout = () => {
    // Remove the token from js-cookie
    cookie.remove("token");
    // Redirect to the desired page or perform further actions
    // Example: Redirect to the login page
    navigate("/login");
  };

  return (
    <>
      {!token ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Layout className="app-bar">
            <Sider trigger={null} collapsible collapsed={collapsed}>
              {menuItems.map((item, index) => {
                if (!item.children) {
                  return (
                    <>
                      <NavItem
                        key={index}
                        to={item.path}
                        title={item.title}
                        icon={item.icon}
                      />
                    </>
                  );
                } else {
                  return (
                    <NavItemGroup
                      active={item.activeRoutes.includes(location.pathname)}
                      key={index}
                      to={item.path}
                      title={item.title}
                      icon={item.icon}
                    >
                      <>
                        {item.children.map((child, childIndex) => {
                          return (
                            <NavItem
                              key={childIndex}
                              to={child.path}
                              title={child.title}
                              icon={child.icon}
                            />
                          );
                        })}
                      </>
                    </NavItemGroup>
                  );
                }
              })}
            </Sider>
            <Layout className="site-layout">
              <Header style={{ headerStyle, background: colorBgContainer }}>
                <div>
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )}
                  <Button
                    className="logout-btn"
                    type="outlined"
                    icon={<LogoutOutlined />}
                    size="large"
                    onClick={handleLogout}
                  />
                </div>
              </Header>
              <Layout>
                <div
                  style={{
                    margin: "24px 16px 0",
                  }}
                >
                  <CustomBreadCrumb />
                </div>

                <Content
                  style={{
                    padding: 15,
                    background: colorBgContainer,
                    margin: "24px 16px 0",
                    overflow: "initial",
                  }}
                >
                  <Outlet />
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  {new Date().getFullYear()}©
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
}

export default AppBar;
