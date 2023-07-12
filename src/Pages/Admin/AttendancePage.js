import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Table, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { AxiosAdmin } from "../../Utils/Axios";

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  const [textResponse, setTextResponse] = useState("");

  console.log(data);

  const [group, setGroup] = useState("");
  const [teacher, setTeacher] = useState("");

  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  /**
   * Data form
   */
  const [groups, setGroups] = useState([]);
  const [teachers, setDataTeachers] = useState([]);

  console.log(group);

  const handleCloseModal = () => {
    setShowModal(false);
    setTextResponse("");
  };

  const handleShowModal = () => setShowModal(true);

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

  const getDataTeacher = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/admin/get/teacher");

      if (response?.status === 200) {
        // setData(response);
        setDataTeachers(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("https://sregep.masuk.id/api/admin/get/jadwal");

      if (response?.status === 200) {
        // setData(response);
        setData(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async () => {
    await setTextResponse("");
    try {
      const qs = require("qs");
      let data = qs.stringify({
        groupId: group?.id,
        groupName: group?.name,
        day: day,
        subject: subject,
        startTime: startTime,
        endTime: endTime,
        teacherId: teacher?.id,
        teacherName: teacher?.name,
      });

      const response = await AxiosAdmin.post(
        "https://sregep.masuk.id/api/admin/create/jadwal",
        data
      );

      if (response?.status === 200) {
        setShowModal(false);
        getData();
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

  useEffect(() => {
    getDataGroups();
    getData();
    getDataTeacher();
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
        <Button onClick={handleShowModal}>Tambah Jadwal</Button>
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
              <Form.Label>Kelas</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setGroup({ id: e.target[e.target.selectedIndex].id, name: e.target.value })
                }
              >
                <option>Pilih kelas</option>
                {groups?.map((obj) => {
                  return (
                    <option id={obj?.groupId} value={obj?.name}>
                      {obj?.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Hari</Form.Label>
              <Form.Select onChange={(e) => setDay(e.target.value)}>
                <option>Pilih hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Nama Mata Pelajaran</Form.Label>
              <Form.Control
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Masukan mata pelajaran"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Jam Mulai</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Masukan jam mulai"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Jam Selesai</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="Masukan jam selesai"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Guru</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setTeacher({ id: e.target[e.target.selectedIndex].id, name: e.target.value })
                }
              >
                <option>Pilih guru</option>
                {teachers?.map((obj) => {
                  console.log(obj)
                  return (
                    <option value={obj?.name} id={obj?.uuid}>
                      {obj?.name}
                    </option>
                  );
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

const AttendancePage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} AtActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default AttendancePage;
