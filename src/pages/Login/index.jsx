import React, { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../config/config";
import cookie from "js-cookie";

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios
      .post(`${api_url}/login`, values)
      .catch((err) => {
        if (err & err.response) setError(err.response.data.message);
      });
    console.log("Response:", response);

    if (response && response.status === 200) {
      const { token } = response.data;
      // Set the token using js-cookie
      cookie.set("token", token);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <>
      <div className="signIn-page w-100">
        <div className="form-container">
          <Form
            name="login"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            // ref={formRef}
          >
            <div className=" fw-500">
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>

              <span>Or </span>
              <a href="/register">Register Now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
