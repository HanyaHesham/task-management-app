import React, { useEffect, useState } from "react";
import CustomCard from "../../../components/Card";
import { getAllTasks } from "./service";
import { api_url } from "../../../config/config";
import { http } from "../../../config/http";

export default function AllTasks() {
  const [tasksData, setTasksData] = useState([]);

  const [loading, setLoading] = useState(true);

  // const handleGetTasks = async () => {
  //   setLoading(true);

  //   const res = await http.get(`${api_url}/tasks`);
  //   const { data } = res.data;
  //   setLoading(false);
  //   setTasksData(data);
  // };

  const handleGetTasks = async () => {
    setLoading(true);
    await getAllTasks()
      .then((res) => {
        console.log(res.data);

        const { data } = res.data;
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

  return (
    <>
      {!loading &&
        tasksData &&
        tasksData?.length > 0 &&
        tasksData?.map((item, index) => (
          <div key={index}>
            <CustomCard title={item.name} status={item.status} />
          </div>
        ))}
    </>
  );
}
