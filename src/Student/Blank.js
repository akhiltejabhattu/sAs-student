import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Blank = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    console.log(url)
    navigate("/authenticate", { state: { url: url } });
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

export default Blank;
