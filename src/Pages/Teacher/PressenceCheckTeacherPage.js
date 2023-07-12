import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";
import { ViewMaps } from "../../Component/Maps";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = async (obj) => {
    setShowModal(true);
  }

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/teacher/rekap-absensi");
      console.log(response)
      if (response?.status === 200) {
        // setData(response);
        setData(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data, 'data')

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
        <h3>Lihat Presensi</h3>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Siswa</th>
            <th>Tipe Presensi</th>
            <th>Lokasi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.name}</td>
              <td>Presensi {obj?.type}</td>
              <td>{obj?.teacherName}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Lokasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewMaps />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

const PressenceCheckTeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} PrChTrActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default PressenceCheckTeacherPage;
