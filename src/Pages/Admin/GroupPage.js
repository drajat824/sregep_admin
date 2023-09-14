import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [textResponse, setTextResponse] = useState("");

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("http://103.123.63.223:8001/api/admin/get/group");

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

  const handleCloseModal = () => {
    setShowModal(false);
    setTextResponse("");
  };

  const handleShowModal = () => setShowModal(true);

  const onSubmit = async () => {
    await setTextResponse("");
    try {
      const qs = require("qs");
      let data = qs.stringify({
        name: name,
      });

      const response = await AxiosAdmin.post(
        "http://103.123.63.223:8001/api/admin/create/group",
        data
      );

      if (response?.status === 200) {
        setShowModal(false);
        getData()
      } else {
        setTextResponse(
          "Periksa kembali data anda dan pastikan koneksi internet Anda stabil. Nama kelas tidak boleh kosong atau sama."
        );
      }
    } catch (e) {
      setTextResponse(
        "Periksa kembali data anda dan pastikan koneksi internet Anda stabil. Nama kelas tidak boleh kosong atau sama."
      );
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
        <h3>Kelas</h3>
        <Button onClick={handleShowModal}>Tambah Kelas</Button>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kelas</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.name}</td>
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
              <Form.Label>Nama Kelas</Form.Label>
              <Form.Control
                value={name}
                placeholder="Masukan nama kelas"
                onChange={(e) => setName(e.target.value)}
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
            Buat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const GroupPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} gpActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default GroupPage;
