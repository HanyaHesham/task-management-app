import React, { useEffect, useState } from "react";
import { getAllTasks, deleteTaskById } from "./service";
import { Button, Col, Row, Card } from "antd";
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

  const handleDeleteTask = async (taskId) => {
    await deleteTaskById(taskId)
      .then((response) => {
        // Handle success
        handleGetTasks();
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <>
      <Row>
        <Col xs={24}>
          {(!loading &&
            tasksData &&
            tasksData?.length > 0 &&
            tasksData?.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                bordered={false}
                className="mb-2"
              >
                <Row>
                  <Col xs={24}>
                    <p>Status is: {item.status}</p>
                  </Col>
                  <Row>
                    <Col xs={24} md={12}>
                      <Button
                        type="outlined"
                        shape="round"
                        icon={<DeleteOutlined />}
                        size="large"
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button type="outlined" shape="round" size="large">
                        Change Status
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Card>
            ))) || (
            <>
              <div className=" fw-500 text-center">
                <h2>There are no Tasks yet</h2>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
