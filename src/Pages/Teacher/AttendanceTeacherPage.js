import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/teacher/jadwal");

      if (response?.status === 200) {
        // setData(response);
        setData(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getData();

  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        padding: 30,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Jadwal</h3>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Mata Pelajaran</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Nama Guru</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.subject}</td>
              <td>{obj?.day}</td>
              <td>{`${obj?.startTime} - ${obj?.endTime}`}</td>
              <td>{obj?.teacherName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const AttendanceTeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} AtTrActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default AttendanceTeacherPage;
