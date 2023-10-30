import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { createTask } from "./service";

export default function AddTasks() {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTask = () => {
    const payload = {
      name: name,
      status: status,
    };
    setLoading(true);
    createTask(payload)
      .then((response) => {
        // Handle success
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <>
      <Form form={form} name="createTask" scrollToFirstError>
        <div className=" fw-500">
          <h2>Add New Task</h2>
        </div>

        <Form.Item
          name="name"
          label="Task Name"
          rules={[
            {
              required: true,
              message: "Please input your task name!",
            },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Task Status"
          rules={[
            {
              required: true,
              message: "Please input task status",
            },
          ]}
        >
          <Select
            value={status}
            placeholder="Select"
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
            onChange={(value) => setStatus(value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="add-btn"
            onClick={() => handleCreateTask()}
          >
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
