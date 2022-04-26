import { Container } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Ec2Instances from "./Components/Ec2Instances/Ec2Instances";
import ListObjects from "./Components/Object/ListObjects";
import S3Buckets from "./Components/S3Buckets/S3Buckets";
import Services from "./Components/Services/Services";
function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  return (
    <Container maxWidth="lg" className="container">
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/s3" element={<S3Buckets />} />
        <Route path="/ec2" element={<Ec2Instances />} />
        <Route path="/s3/create-bucket" element={<ListObjects />} />
        <Route path="/s3/:id" element={<ListObjects />} />
      </Routes>
    </Container>
  );
}

export default App;
