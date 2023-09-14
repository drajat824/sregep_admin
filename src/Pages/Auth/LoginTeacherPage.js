import React, {useState, useEffect} from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import {Axios} from '../../Utils/Axios'

import {useHistory} from 'react-router-dom'

import { useDispatch } from "react-redux";
import { setTeacherProfile } from "../../store/actions/Auth";

function LoginTeacherPage() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    await setLoading(true);
    setTextError('')
    try {
      const qs = require("qs");
      let data = qs.stringify({
        username: email,
        password: password,
      });

      const response = await Axios.post("http://103.123.63.223:8001/api/auth/login/teacher", data);

      if (response?.status === 200) {
        setLoading(false);
        await dispatch(setTeacherProfile(response));
      } else {
        setLoading(false);
        setTextError(
          "Periksa kembali data anda dan pastikan koneksi internet Anda stabil."
        );
      }
    } catch (e) {
      setLoading(false);
      setTextError(
        "Periksa kembali data anda dan pastikan koneksi internet Anda stabil."
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0", height: "100vh", justifyContent: "center", display: "flex" }}>
      <div style={{ backgroundColor: "white", padding: 30, width: "30%", borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.05)", alignSelf: "center" }}>
        <div> 
        <h3 style={{textAlign: 'center', paddingBottom: 15}}>MASUK AKUN GURU</h3>

        <view>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </view>

        <view>
          <Form.Label htmlFor="inputPassword" className="pt-3">
            Password
          </Form.Label>
          <Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelpBlock" />
        </view>

        <Button disabled={loading} onClick={onLogin} style={{ width: "100%", marginTop: 30 }}>MASUK</Button>

        {textError ?<Alert style={{marginTop: 20}} variant="warning">
          {textError}
        </Alert> : null}

        <hr class="my-4" />

        <Button variant="outline-info" onClick={() => history.replace("/login")} style={{ width: "100%"}}>MASUK ADMIN</Button>
        
        </div>
      </div>
    </div>
  );
}

export default LoginTeacherPage;
