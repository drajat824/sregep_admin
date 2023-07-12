import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "../../Component/Menu";

const Content = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        padding: 30,
      }}
    >
      DashboardTeacherPage
    </div>
  );
};

const DashboardTeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} dbTrActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default DashboardTeacherPage;
