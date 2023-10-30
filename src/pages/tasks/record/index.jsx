import React, { useEffect, useState } from "react";
import { getAllTasks } from "./service";
import { Button, Col, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function AllTasks() {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetTasks = async () => {
    setLoading(true);
    await getAllTasks()
      .then((res) => {
        const { data } = res;
        setTasksData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  const columns = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
      render: (name) => <>{name || "---"}</>,
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      render: (status) => <>{status || "---"}</>,
    },

    {
      title: "actions",
      key: "actions",
      dataIndex: "actions",

      render: (actions, _) => {
        return (
          <div>
            <Button type="outlined" shape="round" icon={<DeleteOutlined />}>
              Delete
            </Button>

            <Button type="outlined" shape="round">
              Change Status
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Row>
        <Col xs={24}>
          <Table columns={columns} dataSource={tasksData} loading={loading} />
        </Col>
      </Row>
    </>
  );
}
