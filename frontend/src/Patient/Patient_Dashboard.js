import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Patient_Dashboard.module.css";
import { VIEW_COUNT_URL } from "../api/constants";
import axios from "axios";

const Patient_Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [errMsg, setErrMsg] = useState("");
  const [crowdCounter, setCrowdCounter] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);

  useEffect(() => {
    axios
      .get(VIEW_COUNT_URL)
      .then(function (response) {
        setCrowdCounter(response.data.count + "%");
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        setFailure(true);
        setBuffer(false);
      });
  });

  const Signout = async () => {
    const { logout } = useAuth();
    const response = await logout();
    if (response == false) navigate("/login");
    setErrMsg("Cannot Logout. Please try again later ");
  };

  const GenerateSession = async () => {
    navigate("/generatesession");
  };

  const ViewHealthRecords = async () => {
    navigate("/patientviewrecords");
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}>{crowdCounter}</div>
          <p>Wait Time: 30 Minutes</p>
          <div class="generate">
            <button class={styles.button} onClick={GenerateSession}>
              Generate Session
            </button>
          </div>
          <div class="view">
            <button class={styles.button} onClick={ViewHealthRecords}>
              View Health Records
            </button>
          </div>
          <div class="signout">
            <button class={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}></div>
          <p>Generating...</p>
          <div class="generate">
            <button class={styles.button} onClick={GenerateSession}>
              Generate Session
            </button>
          </div>
          <div class="view">
            <button class={styles.button} onClick={ViewHealthRecords}>
              View Health Records
            </button>
          </div>
          <div class="signout">
            <button class={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}>Error</div>
          <p>There is an error</p>
          <div class="generate">
            <button class={styles.button} onClick={GenerateSession}>
              Generate Session
            </button>
          </div>
          <div class="view">
            <button class={styles.button} onClick={ViewHealthRecords}>
              View Health Records
            </button>
          </div>
          <div class="signout">
            <button class={styles.button} onClick={Signout}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  }
};
export default Patient_Dashboard;
