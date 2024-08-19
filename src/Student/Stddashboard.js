import React from "react";
import { db } from "../firebase"; // Ensure you import your Firebase instance
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Stddashboard = () => {
  const studentRollNo = localStorage.getItem("rollno"); // Replace with the actual roll number
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMsg, setConfirmationMessage] = useState("");
  const location = useLocation();
  const empid = location.state?.empidd; 
  console.log(empid);
  if (!localStorage.getItem("deviceID")) {
    localStorage.setItem("deviceID", studentRollNo);
  }
  const deviceID = localStorage.getItem("deviceID");

  const handleMarkAttendance = async () => {
    const facultyId = empid // Replace with the actual faculty ID
    const facultyDocRef = doc(db, "attendance", facultyId);
    if (deviceID === studentRollNo) {
      try {
        // Update the students array with the student's roll number
        await updateDoc(facultyDocRef, {
          students: arrayUnion(studentRollNo),
        });
        setConfirmationMessage("Attendance marked successfully!");
        console.log("Attendance marked successfully!");
      } catch (error) {
        console.error("Error marking attendance: ", error);
      }
    } else {
      setErrorMessage("You can't mark multiple students attendance...");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Student Dashboard</h1>
      <div className="d-flex flex-row justify-content-center">
        <button className="btn btn-primary m-1" onClick={handleMarkAttendance}>
          Mark Attendance
        </button>
      </div>
      {confirmationMsg && <p className="text-success mt-3">{confirmationMsg}</p>}
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </div>
  );
};

export default Stddashboard;
