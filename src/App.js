import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListObjects from "./Components/Object/ListObjects";
import S3Buckets from "./Components/S3Buckets/S3Buckets";
import Services from "./Components/Services/Services";

function App() {
  return (
    <Container maxWidth="lg" className="container">
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/s3" element={<S3Buckets />} />
        <Route
          path="/ec2"
          element={
            <React.Fragment>
              <h1>
                Work going on for EC2 service(frontend). Inconvenience is deeply
                regretted...
              </h1>
            </React.Fragment>
          }
        />
        <Route path="/s3/create-bucket" element={<ListObjects />} />
        <Route path="/s3/:id" element={<ListObjects />} />
      </Routes>
    </Container>
  );
}

export default App;
