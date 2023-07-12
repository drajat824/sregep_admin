import React, {useState, useEffect} from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import {Axios} from "../../Utils/Axios";

import { useDispatch } from "react-redux";
import { setAdminProfile } from "../../store/actions/Auth";

function RegisterPage() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [textAlert, setTextAlert] = useState("");
  
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    await setLoading(true);
    setTextAlert('')
    try {
      const qs = require("qs");
      let data = qs.stringify({
        name: name,
        email: email,
        password: password,
      });

      const response = await Axios.post("https://sregep.masuk.id/api/auth/register", data);

      if (response?.status === 200) {
        setLoading(false);
        await dispatch(setAdminProfile(response));
        setTextAlert('Akun berhasil dibuat!')
      } else {
        setLoading(false);
        setTextAlert(
          "Periksa kembali data anda dan pastikan koneksi internet Anda stabil."
        );
      }
    } catch (e) {
      setLoading(false);
      setTextAlert(
        "Periksa kembali data anda dan pastikan koneksi internet Anda stabil."
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0", height: "100vh", justifyContent: "center", display: "flex" }}>
      <div style={{ backgroundColor: "white", padding: 30, width: "30%", borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.05)", alignSelf: "center" }}>
        
        <h3 style={{textAlign: 'center', paddingBottom: 15}}>DAFTAR ADMIN</h3>

        <view>
          <Form.Label htmlFor="text">Nama</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </view>

        <view>
          <Form.Label htmlFor="email" className="pt-3">Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </view>

        <view>
          <Form.Label htmlFor="inputPassword" className="pt-3">
            Password
          </Form.Label>
          <Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" />
        </view>

        <Button disabled={loading} onClick={onLogin} style={{ width: "100%", marginTop: 30 }}>DAFTAR</Button>

        {textAlert ?<Alert style={{marginTop: 20}} variant="warning">
          {textAlert}
        </Alert> : null}

        <hr class="my-4" />

        <p class="mb-0">Sudah punya akun? <a href="/login" class="text-blue-50 fw-bold">Masuk</a></p>

      </div>
    </div>
  );
}

export default RegisterPage;
