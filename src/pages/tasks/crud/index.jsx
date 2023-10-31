import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { createTask } from "./service";

export default function AddTasks() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateTask = () => {
    const userId = localStorage.getItem("userId");
    form
      .validateFields()
      .then((values) => {
        const payload = {
          name: values.name,
          status: "active",
          userId: Number(userId),
        };
        setLoading(true);
        createTask(payload)
          .then((response) => {
            // Handle success
            console.log(response);
            message.success("Task added Successfully");
            form.resetFields();
          })
          .catch((error) => {
            // Handle error
            console.log(error);
            message.error("Failed to add task");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("Field validation error:", error);
      });
  };

  return (
    <>
      <div className="form-container">
        <Form
          form={form}
          name="createTask"
          scrollToFirstError
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
        >
          <div className="fw-500 text-center">
            <h2>Add New Task</h2>
          </div>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your task name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select
              placeholder="Select"
              defaultValue="active"
              disabled
              options={[
                {
                  value: "completed",
                  label: "completed",
                },
                {
                  value: "active",
                  label: "active",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <div className="text-center">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="add-btn"
                onClick={() => handleCreateTask()}
              >
                Add Task
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
