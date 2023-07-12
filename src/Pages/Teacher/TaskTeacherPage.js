import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from '../../Component/Menu'

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
      TaskPage
    </div>
  );
};

const TaskTeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} tsTrActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default TaskTeacherPage;
