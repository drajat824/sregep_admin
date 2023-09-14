import React, { useState, useEffect } from "react";
import { Modal, Col, Button, Table, Form, Alert } from "react-bootstrap";
import Menu from "../../Component/Menu";
import { ViewMaps } from "../../Component/Maps";
import { AxiosAdmin } from "../../Utils/Axios";
import { SelectMaps } from "../../Component/Maps";

const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [data, setData] = useState([]);
  const [textResponse, setTextResponse] = useState("");

  const [jadwalId, setJadwalId] = useState("");
  const [type, setType] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null, radius: null });

  const [locModal, setLocModal] = useState(null)

  console.log(data)

  // const [tempData, setTempData] = useState([]);
  // console.log(tempData)

  // const getDataJadwal = async () => {
  //   try {
  //     const response = await AxiosAdmin.get("http://103.123.63.223:8001/api/teacher/jadwal");

  //     if (response?.status === 200) {
  //       // setData(response);
  //       setTempData(response?.data?.data);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getDataJadwal()
  // }, [])

  const getLocation = (dataLocation) => {
    setLocation(dataLocation);
    setLocation((state) => ({
      ...state,
      lat: dataLocation?.lat,
      lng: dataLocation?.lng,
      radius: 10,
    }));
  };

  const [attendances, setAttendances] = useState([]);

  const getDataAttendances = async () => {
    try {
      const response = await AxiosAdmin.get("http://103.123.63.223:8001/api/teacher/jadwal");

      if (response?.status === 200) {
        // setData(response);
        setAttendances(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const response = await AxiosAdmin.get("http://103.123.63.223:8001/api/teacher/absensi");

      if (response?.status === 200) {
        setData(response?.data?.data);
        console.log(response?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataAttendances();
    getData();
  }, []);

  const handleShowModalAdd = () => setShowModalAdd(true);
  const handleCloseModalAdd = () => setShowModalAdd(false);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = async (obj) => {
    await setLocModal(obj?.lokasi)
    setShowModal(true);
  }

  const onSubmit = async () => {
    await setTextResponse("");

    const lokasi = JSON.stringify({
      lat: location?.lat,
      lng: location?.lng,
      radius: location?.radius,
    });

    try {
      const qs = require("qs");
      let data = qs.stringify({
        jadwalId: jadwalId,
        type: type,
        maxTime: maxTime,
        question: question,
        lokasi: lokasi,
      });

      const response = await AxiosAdmin.post("http://103.123.63.223:8001/api/teacher/absensi", data);

      if (response?.status === 200) {
        setShowModalAdd(false);
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
        <h3>Presensi Siswa</h3>
        <Button onClick={handleShowModalAdd}>Tambah Presensi</Button>
      </div>

      <hr class="my-4" />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Waktu Presensi</th>
            <th>Peranyaan</th>
            <th>Lokasi</th>
            <th>Waktu Maksimal</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{obj?.type}</td>
              <td>{obj?.question}</td>
              <td>
                <Button setLocModal onClick={() => handleShowModal(obj)} >Lihat</Button>
              </td>
              <td>{obj?.maxTime}</td>
            </tr>
          ))}
          {/* <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button onClick={handleShowModal}>Lihat</Button>
            </td>
            <td>@mdo</td>
          </tr> */}
        </tbody>
      </Table>

      {
        // Modal Tambah Presensi
      }

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Lokasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewMaps center={locModal} />
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

      <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Presensi Siswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Pilih Jadwal</Form.Label>
              <Form.Select value={jadwalId} onChange={(e) => setJadwalId(e.target.value)}>
                <option>Pilih jadwal</option>
                {attendances?.map((obj) => {
                  return <option value={obj?.id}>{obj?.subject}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Tipe Presensi</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Pilih jadwal</option>
                <option value="awal">Presensi Awal</option>
                <option value="akhir">Presensi Akhir</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Waktu Maksimal Presensi</Form.Label>
              <Form.Control
                value={maxTime}
                type="time"
                onChange={(e) => setMaxTime(e.target.value)}
                placeholder="Masukan waktu maksimal"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Pertanyaan</Form.Label>
              <Form.Control
                value={question}
                as="textarea"
                placeholder="Masukan pertanyaan setelah presensi"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="#">
              <Form.Label>Lokasi Presensi</Form.Label>
              <SelectMaps getLocation={getLocation} />
            </Form.Group>

            {textResponse ? (
              <Alert style={{ marginTop: 20 }} variant="warning">
                {textResponse}
              </Alert>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAdd}>
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

const PressenceTeacherPage = (props) => {
  return (
    <section class="my-5 container">
      <div class="row">
        <Col lg={3}>
          <Menu {...props} PrTrActive="#5956FF" />
        </Col>
        <Col>
          <Content />
        </Col>
      </div>
    </section>
  );
};

export default PressenceTeacherPage;
