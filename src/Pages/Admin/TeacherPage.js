import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setTextResponse("");
  };

  const handleShowModal = () => setShowModal(true);

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/admin/get/teacher");

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

  const [textResponse, setTextResponse] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await setTextResponse("");
    try {
      const qs = require("qs");
      let data = qs.stringify({
        name: name,
        username: username,
        password: password,
      });

      const response = await AxiosAdmin.post(
        "https://sregep.masuk.id/api/admin/create/teacher",
        data
      );

      if (response?.status === 200) {
        setShowModal(false);
        getData();
      } else {
        setTextResponse("Periksa kembali data anda dan pastikan koneksi internet Anda stabil.");
      }
    } catch (e) {
      setTextResponse("Periksa kembali data anda dan pastikan koneksi internet Anda stabil.");
      console.log(e);
    }
  };

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
        <h3>Guru</h3>
        <Button onClick={handleShowModal}>Tambah Guru</Button>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.name}</td>
              <td>{obj?.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {
        // Modal Tambah Siswa
      }

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Nama Guru</Form.Label>
              <Form.Control
                placeholder="Masukan nama"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Email Guru</Form.Label>
              <Form.Control
                placeholder="Masukan email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Masukan password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            {textResponse ? (
              <Alert style={{ marginTop: 20 }} variant="warning">
                {textResponse}
              </Alert>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Buat Akun
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const TeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} teaActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default TeacherPage;
