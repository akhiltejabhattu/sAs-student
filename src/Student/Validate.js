import { useNavigate, useState, useLocation} from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
function isPointInsideRectangle(point, rectCorners) {
  // rectCorners should be an array of 4 objects, each containing 'lat' and 'long' properties
  const [p1, p2, p3, p4] = rectCorners;

  // Calculate the cross product of vectors (p - p1) and (p2 - p1)
  function crossProduct(p, p1, p2) {
    return (
      (p.lat - p1.lat) * (p2.long - p1.long) -
      (p.long - p1.long) * (p2.lat - p1.lat)
    );
  }

  // Check if the point lies to the left of all edges
  const d1 = crossProduct(point, p1, p2);
  const d2 = crossProduct(point, p2, p3);
  const d3 = crossProduct(point, p3, p4);
  const d4 = crossProduct(point, p4, p1);

  return (
    (d1 >= 0 && d2 >= 0 && d3 >= 0 && d4 >= 0) ||
    (d1 <= 0 && d2 <= 0 && d3 <= 0 && d4 <= 0)
  );
}
const rectCorners = [
  {
    lat: 17.542113,
    long: 78.38492,
  }, // Corner 1
  {
    lat: 17.541704,
    long: 78.387632,
  }, // Corner 2
  {
    lat: 17.539669,
    long: 78.387584,
  }, // Corner 3
  {
    lat: 17.539914,
    long: 78.383775,
  }, // Corner 4
];
async function getLocationAsync() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
async function showPositionAsync() {
  try {
    const position = await getLocationAsync();
    const point = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    console.log(1);
    return point;
  } catch (error) {
    console.error(error.message);
  }
}
async function f() {
  const pointToCheck = await showPositionAsync();
  console.log(pointToCheck);
  const isInside = await isPointInsideRectangle(pointToCheck, rectCorners);
  // document.write(`Is the point inside the rectangle? ${isInside}`);
  console.log(isInside);
  return isInside;
}
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
          if(await f()){
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
        else{
          navigate("/finalpage", {
            state: { msg: "You are not in class.. " },
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
