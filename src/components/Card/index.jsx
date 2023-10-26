import React from "react";
import { Card } from "antd";

export default function CustomCard({ title, status }) {
  return (
    <>
      <Card title={title} bordered={false}>
        <p>Status is: {status}</p>
      </Card>
    </>
  );
}
