import React from "react";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { BiSolidHome, BiLogOut, BiCalendarAlt, BiUserCheck, BiTask, BiMapPin } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/Auth";

const Menu = ({
  AtActive,
  dbActive,
  gpActive,
  PrTrActive,
  stActive,
  tsTrActive,
  teaActive,
  dbTrActive,
  AtTrActive,
  PrChTrActive
}) => {
  let { admin } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const onLogout = async () => {
    window.location.reload();
    await dispatch(logout());
  };

  if (!admin) {
    return (
      <>
        <div
          className="flex-column"
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            padding: 30,
          }}
        >
          <div className="mb-5">
            <BiSolidHome
              style={{ alignSelf: "center", color: dbTrActive ? dbTrActive : "black" }}
              size={50}
            />
            <span className="text-menu">
              <Link
                to="/teacher-role/"
                style={{
                  color: dbTrActive ? dbTrActive : "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Link>
            </span>
          </div>

          <div className="mb-5">
            <BiCalendarAlt
              style={{ alignSelf: "center", color: AtTrActive ? AtTrActive : "black" }}
              size={50}
            />
            <span className="text-menu">
              <Link
                to="/teacher-role/attendace"
                style={{
                  color: AtTrActive ? AtTrActive : "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Lihat Jadwal
              </Link>
            </span>
          </div>

          <div className="mb-5">
            <BiUserCheck
              style={{ alignSelf: "center", color: PrTrActive ? PrTrActive : "black" }}
              size={50}
            />
            <span className="text-menu">
              <Link
                to="/teacher-role/pressence"
                style={{
                  color: PrTrActive ? PrTrActive : "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Presensi
              </Link>
            </span>
          </div>

          <div className="mb-5">
            <BiMapPin
              style={{ alignSelf: "center", color: PrChTrActive ? PrChTrActive : "black" }}
              size={50}
            />
            <span className="text-menu">
              <Link
                to="/teacher-role/pressence-check"
                style={{
                  color: PrChTrActive ? PrChTrActive : "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Lihat Presensi
              </Link>
            </span>
          </div>

          <div>
            <BiTask
              style={{ alignSelf: "center", color: tsTrActive ? tsTrActive : "black" }}
              size={50}
            />
            <span className="text-menu">
              <Link
                to="/teacher-role/task"
                style={{
                  color: tsTrActive ? tsTrActive : "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Tugas
              </Link>
            </span>
          </div>
        </div>
        <div
          className="flex-column"
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            padding: 20,
            marginTop: 20,
          }}
        >
          <div>
            <BiLogOut style={{ alignSelf: "center", color: "red" }} size={50} />
            <span className="text-menu">
              <Link
                onClick={onLogout}
                to=""
                style={{
                  color: "black",
                  fontSize: 20,
                  textDecoration: "none",
                  paddingLeft: 20,
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Keluar
              </Link>
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="flex-column"
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          padding: 30,
        }}
      >
        <div className="mb-5">
          <BiSolidHome
            style={{ alignSelf: "center", color: dbActive ? dbActive : "black" }}
            size={50}
          />
          <span className="text-menu">
            <Link
              to="/"
              style={{
                color: dbActive ? dbActive : "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                fontWeight: "bold",
              }}
            >
              Dashboard
            </Link>
          </span>
        </div>

        <div className="mb-5">
          <FaChalkboardTeacher
            style={{ alignSelf: "center", color: gpActive ? gpActive : "black" }}
            size={50}
          />
          <span className="text-menu">
            <Link
              to="/group"
              style={{
                color: gpActive ? gpActive : "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                fontWeight: "bold",
              }}
            >
              Kelas
            </Link>
          </span>
        </div>

        <div className="mb-5">
          <FaUsers
            style={{ alignSelf: "center", color: teaActive ? teaActive : "black" }}
            size={50}
          />
          <span className="text-menu">
            <Link
              to="/teacher"
              style={{
                color: teaActive ? teaActive : "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                fontWeight: "bold",
              }}
            >
              Guru
            </Link>
          </span>
        </div>

        <div className="mb-5">
          <FaUsers
            style={{ alignSelf: "center", color: stActive ? stActive : "black" }}
            size={50}
          />
          <span className="text-menu">
            <Link
              to="/student"
              style={{
                color: stActive ? stActive : "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                fontWeight: "bold",
              }}
            >
              Siswa
            </Link>
          </span>
        </div>

        <div>
          <BiCalendarAlt
            style={{ alignSelf: "center", color: AtActive ? AtActive : "black" }}
            size={50}
          />
          <span className="text-menu">
            <Link
              to="/attendance"
              style={{
                color: AtActive ? AtActive : "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                fontWeight: "bold",
              }}
            >
              Jadwal
            </Link>
          </span>
        </div>
      </div>

      <div
        className="flex-column"
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          padding: 20,
          marginTop: 20,
        }}
      >
        <div>
          <BiLogOut style={{ alignSelf: "center", color: "red" }} size={50} />
          <span className="text-menu">
            <Link
              onClick={onLogout}
              to=""
              style={{
                color: "black",
                fontSize: 20,
                textDecoration: "none",
                paddingLeft: 20,
                color: "red",
                fontWeight: "bold",
              }}
            >
              Keluar
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Menu;
