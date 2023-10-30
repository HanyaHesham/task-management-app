import React, { useEffect, useState } from "react";
import { getAllTasks, deleteTaskById, updateTaskStatus } from "./service";
import { Button, Col, Row, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function AllTasks() {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(null);

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

  const handleChangeStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "active" : "completed";
    await updateTaskStatus(taskId, newStatus)
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

  const handleFilterTasks = (status) => {
    setFilterStatus(status);
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  const filteredTasks = filterStatus
    ? tasksData.filter((task) => task.status === filterStatus)
    : tasksData;

  return (
    <>
      <Row>
        <Col xs={24}>
          <div className="mb-2">
            <Button
              type="primary"
              onClick={() => handleFilterTasks(null)}
              disabled={filterStatus === null}
            >
              Show All
            </Button>{" "}
            <Button
              onClick={() => handleFilterTasks("active")}
              disabled={filterStatus === "active"}
            >
              Show Active
            </Button>{" "}
            <Button
              onClick={() => handleFilterTasks("completed")}
              disabled={filterStatus === "completed"}
            >
              Show Completed
            </Button>
          </div>
          {(!loading &&
            filteredTasks &&
            filteredTasks.length > 0 &&
            filteredTasks.map((item, index) => (
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
                      <Button
                        type="outlined"
                        shape="round"
                        size="large"
                        onClick={() => handleChangeStatus(item.id, item.status)}
                      >
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
