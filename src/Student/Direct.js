import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const fetchQRCode = async (empid) => {
  try {
    const qrDoc = await getDoc(doc(db, "qrCodes", empid));
    if (qrDoc.exists()) {
      return qrDoc.data().qrCodeValue;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching QR code: ", error);
    return null;
  }
};
const Direct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      console.log(url);
      let lastQuesMarkIndex = await url.lastIndexOf("?");
      console.log(lastQuesMarkIndex);
      let empid, key;

      if (lastQuesMarkIndex > -1) {
        empid = url.slice(lastQuesMarkIndex + 1, lastQuesMarkIndex + 11);
        key = url.slice(lastQuesMarkIndex + 11);
      } else {
        navigate("/finalpage", {
          state: { msg: "Invalid scan... scan again." },
        });
      }

      console.log(empid, key);
      const value = await fetchQRCode(empid);

      if (key === value) {
        navigate("/validate", {
          state: { empid: empid},
        });
      }
        else {
        navigate("/finalpage", {
          state: {
            msg: "Scan again.., scan the QR at the moment it is updated",
          },
        });
      }
    };

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

export default Direct;
