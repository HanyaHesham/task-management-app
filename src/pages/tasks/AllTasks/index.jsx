import React, { useEffect, useState } from "react";
import { getAllTasks, deleteTaskById, updateTaskStatus } from "./service";
import { Button, Col, Row, Card, Progress, Tag } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function AllTasks() {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(null);

  const handleGetTasks = async () => {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    await getAllTasks()
      .then((res) => {
        const { data } = res;
        setTasksData(data.filter((x) => Number(x.userId) === Number(userId)));
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
        <Col xs={24} md={12}>
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
                title={item?.name}
                bordered={false}
                className="mb-2"
              >
                <Col xs={20} md={12}>
                  {item?.status === "completed" ? (
                    // <Progress percent={100} format={() => item?.status} />
                    <Tag color="success">{item?.status}</Tag>
                  ) : (
                    // <Progress percent={50} format={() => item?.status} />
                    <Tag color="processing">{item?.status}</Tag>
                  )}
                </Col>
                <Row>
                  <Row className="mt-1">
                    <Col xs={24} md={8}>
                      <Link to={`/tasks/view/${item.id}`}>
                        <Button
                          className="mb-1"
                          shape="round"
                          icon={<EyeOutlined />}
                        >
                          View
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={24} md={8}>
                      <Button
                        className="mb-1"
                        shape="round"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col xs={24} md={8}>
                      <Button
                        className="mb-1"
                        shape="round"
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
              <div className="fw-500 text-center">
                <h2>There are no Tasks yet</h2>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
