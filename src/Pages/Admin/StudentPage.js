import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";
import { SelectMaps } from "../../Component/Maps";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  const [groups, setGroups] = useState([]);

  const [data, setData] = useState([]);
  const [textResponse, setTextResponse] = useState("");

  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [groupId, setGroupId] = useState("");

  const getDataGroups = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/admin/get/group");

      if (response?.status === 200) {
        // setData(response);
        setGroups(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data, 'data')

  const getData = async () => {
    let responseData = [];
    let tempData = []

    for (const item of groups) {
      console.log(item?.groupId, 'groupId')
      try {
        const response = await AxiosAdmin.get(`https://sregep.masuk.id/api/admin/get/student/${item?.groupId}`);
        const data = response?.data?.data;
        
        if (response?.status === 200) {
          if (data.length > 1) {
            data?.map((obj) => {
              responseData.push(obj)
            })
          }
        }

      } catch (e) {
        console.log(e);
      }
    }

    setData(responseData)
  };

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
        studentId: nis,
        groupId: groupId,
      });

      const response = await AxiosAdmin.post(
        "https://sregep.masuk.id/api/admin/create/student",
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

  useEffect(() => {
    getDataGroups();
  }, []);

  useEffect(() => {
    if(groups !== []){
      getData()
    }
  }, [groups])

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
        <h3>Siswa</h3>
        <Button onClick={handleShowModal}>Tambah Siswa</Button>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Nomer Induk Siswa</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.name}</td>
              <td>{obj?.studentId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {
        // Modal Tambah Siswa
      }

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Siswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Nomer Induk Siswa</Form.Label>
              <Form.Control
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                placeholder="Masukan nomer induk siswa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Nama Siswa</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukan nama siswa"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Kelas Siswa</Form.Label>
              <Form.Select onChange={(e) => setGroupId(e.target.value)}>
                <option>Pilih kelas siswa</option>
                {groups?.map((obj) => {
                  return <option value={obj?.groupId}>{obj?.name}</option>;
                })}
              </Form.Select>
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

const StudentPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} stActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default StudentPage;
