import React, { useContext, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { createTask } from "./service";
import { UserContext } from "../../Login/index";

export default function AddTasks() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const userId = useContext(UserContext);

  const handleCreateTask = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          name: values.name,
          status: "active",
          userId: userId?.id,
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
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Task Status">
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
