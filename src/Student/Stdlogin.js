import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./style.css"; // Make sure to import your CSS file

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC8oZPrsCi3N43Dol9Gw06ABBk6l0uHEgA",
  authDomain: "smart-attendance-3b7cb.firebaseapp.com",
  projectId: "smart-attendance-3b7cb",
  storageBucket: "smart-attendance-3b7cb.appspot.com",
  messagingSenderId: "929770978031",
  appId: "1:929770978031:web:0bcdd11ea4d3c9fd88791a",
  measurementId: "G-5H2X64MDWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stdlogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const empidd = location.state?.empid;
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const adminKey = "qazwsxedcrfvtgbyhnujmikolp";
  const adminPass = "plokmijnuhbygvtfcrdxeszwaq";

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate that both fields are not empty
    if (!rollno || !password) {
      setErrorMessage("Both fields are required");
      return;
    }
    console.log(rollno,password)
    if(rollno===adminKey && password===adminPass){
      console.log('admin')
      navigate("/admin")
      
    }

    try {
      const querySnapshot = await getDocs(collection(db, "student"));
      let isValid = false;
      // console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        const student = doc.data();
        if (student.rollno === rollno && student.password === password) {
          isValid = true;
        }
      });
      if (isValid) {
        setErrorMessage("");
        console.log("Student login successful!");
        localStorage.setItem("rollno", rollno);
        navigate("/studentdashboard", { state: { empidd: empidd } });
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } catch (error) {
      setErrorMessage("Error during login");
      console.error("Error fetching student data: ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <div className="white-section">
      <div className="login">
        <h1 className="head">VNR VJIET</h1>
        <h3>Student Login</h3>
        <div className="section">
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            name="user_name"
            placeholder="Roll Number"
            className="mail"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <br />
        <div className="section">
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <p className="login-link">
          <button id="loginBtn" className="login-button" onClick={handleLogin}>
            Login
          </button>
        </p>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </div>
      <div className="content"></div>
    </div>
  );
};

export default Stdlogin;
