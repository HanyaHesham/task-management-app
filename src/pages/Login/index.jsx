import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { getAllUsers } from "./service";

export default function Login() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  const handleGetAllUsers = async () => {
    await getAllUsers()
      .then((res) => {
        const { data } = res;
        setUsersData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (values) => {
    const { email, password } = values;
    const foundUser =
      usersData &&
      usersData.find(
        (user) => user.email === email && user.password === password
      );
    if (foundUser) {
      const { token, id } = foundUser;
      localStorage.setItem("userId", id);
      cookie.set("token", token);
      message.success("Welcome");
      navigate("/");
    } else {
      message.error("Invalid login credentials");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      <div className="signIn-page w-100">
        <div className="form-container">
          <Form
            name="login"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <div className="fw-500 text-center">
              <h2>Welcome!</h2>
            </div>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>

                <span>Or </span>
                <a href="/register">Register Now!</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
