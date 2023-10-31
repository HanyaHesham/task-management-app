import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { createUser } from "./service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          email: values.email,
          password: values.password,
        };
        setLoading(true);
        createUser(payload)
          .then((response) => {
            // Handle success
            console.log(response);
            message.success("User created successfully");
            navigate("/login");
          })
          .catch((error) => {
            // Handle error
            console.log(error);
            message.error("Failed to create user");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("Field validation error:", error);
      });
  };

  const onSubmit = () => {
    handleCreateUser();
  };
  return (
    <>
      <div className="signIn-page w-100">
        <div className="form-container">
          <Form
            form={form}
            name="register"
            onFinish={onSubmit}
            scrollToFirstError
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  Register
                </Button>

                <span>Or </span>
                <a href="/login">login Now!</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
