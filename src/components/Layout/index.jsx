import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import NavItem from "../Navs/NavItem";
import CustomBreadCrumb from "../CustomBreadCrumb";
import cookie from "js-cookie";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const token = cookie.get("token");
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      title: "Home",
      path: "/",
    },
    {
      key: "/tasks/all-tasks",
      title: "Tasks",
      path: "/tasks/all-tasks",
    },
    {
      key: "/tasks/add",
      title: "Add",
      path: "/tasks/add",
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
        <Layout className="layout">
          <Header className="header">
            {menuItems &&
              menuItems?.map((item, index) => {
                return (
                  <>
                    <NavItem key={index} to={item.path} title={item.title} />
                  </>
                );
              })}
            <div>
              <Button
                className="logout-btn"
                type="outlined"
                icon={<LogoutOutlined />}
                size="large"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Header>
          <Content className="mt-3">
            <div className="site-layout-content">
              <CustomBreadCrumb />
              <Content className="mt-1">
                <Outlet />
              </Content>
            </div>
          </Content>
          <Footer className="footer">{new Date().getFullYear()}©</Footer>
        </Layout>
      )}
    </>
  );
};
export default MainLayout;
