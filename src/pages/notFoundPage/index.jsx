import React from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Row className="mt-15">
        <Col
          xs={{
            span: 11,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 9,
          }}
        >
          <div className="d-flex justify-center">
            <h2 class="my-3 headline text-center">Page Not Found</h2>
          </div>

          <div className="d-flex justify-center">
            <Button appearance="primary" size="lg">
              <Link to={"/"}>Back to home</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
