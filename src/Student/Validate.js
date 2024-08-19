import { useNavigate, useState, useLocation} from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const Validate = () => {
    const navigate = useNavigate();
    const location=useLocation();
    const empid = location.state?.empid;
    const rollno=location.state?.rollno;
    if(rollno){
        localStorage.setItem("rollNo",rollno)
    }

    useEffect(() => {
      const fetchData = async () => {
          const rollNo = localStorage.getItem("rollNo");
          console.log("rollNo:"+rollNo);
          if (!rollNo) {
            console.log("login navigation");
            navigate("/login", { state: { empid: empid } });
          } else {
            const facultyDocRef = doc(db, "attendance", empid);
            await updateDoc(facultyDocRef, {
              students: arrayUnion(rollNo),
            });
            console.log("Attendance marked successfully!");
            navigate("/finalpage", {
              state: { msg: "Attendance marked successfully for " + rollNo },
            });
          }
        } 
      fetchData();
    }, [navigate]);
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Validate;
