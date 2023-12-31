import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card, Tag } from "antd";
import { getTaskById } from "./service";
import { useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function ViewTask() {
  const [taskData, setTaskData] = useState({});
  const { id } = useParams();

  const handleGetTasksById = async () => {
    await getTaskById(id)
      .then((res) => {
        const { data } = res;
        setTaskData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetTasksById();
  }, []);

  return (
    <>
      <Card title={taskData?.name} bordered={false} className="mb-2">
        <Col xs={20} md={12}>
          {taskData?.status === "completed" ? (
            <Tag color="success">{taskData?.status}</Tag>
          ) : (
            <Tag color="processing">{taskData?.status}</Tag>
          )}
        </Col>
        <Row>
          <Col xs={24} md={8}>
            <Link to="/tasks/all-tasks">
              <Button
                className="mb-1 mt-1"
                shape="round"
                icon={<ArrowLeftOutlined />}
                size="large"
              >
                Back
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
}
