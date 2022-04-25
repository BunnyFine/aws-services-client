import {
  Box,
  Snackbar,
  Button,
  Slide,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Axios from "../../axios";
import Object from "./Object";

import "./object.css";
const ListObjects = ({ objectProps, owner }) => {
  const location = useLocation();
  const [objects, setObjects] = useState([]);
  const containerRef = React.useRef(null);
  const [btn, setbtn] = useState("Add object");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [file, setFile] = useState(null);
  const [load, setload] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = () => {
    setChecked((prev) => {
      if (!prev) {
        setbtn("Hide");
      } else {
        setbtn("Add bucket");
      }
      return !prev;
    });
  };
  const fetchdata = async () => {
    try {
      const res = await Axios.get(
        "/s3/list/" + location.pathname.split("/")[2]
      );
      console.log(res.data);
      setObjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const needRefresh = () => {
    fetchdata();
  };
  useEffect(() => {
    fetchdata().then(() => {
      setload(false);
    });
  }, []);
  return (
    <React.Fragment>
      <h1>{location.pathname.split("/")[2]}</h1>
      <Box ref={containerRef}>
        <Box sx={{ width: 200 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleChange}
            style={{ marginBottom: "1.5rem" }}
          >
            {btn}{" "}
          </Button>
          <div></div>
          <Slide direction="up" in={checked} container={containerRef.current}>
            <div>
              <TextField
                label="Bucket"
                type="file"
                variant="standard"
                style={{ border: "black" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                onClick={async (e) => {
                  try {
                    const fd = new FormData();
                    fd.append("object", file);
                    const res = await Axios.post(
                      "/s3/upload/" + location.pathname.split("/")[2],
                      fd,
                      { "Content-Type": "multipart/form-data" }
                    );
                    console.log(res.data);
                    await fetchdata();
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Upload
              </Button>
            </div>
          </Slide>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="There's problem uploading file"
          />
        </Box>
      </Box>
      {load ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        ""
      )}
      {objects.map((obj) => (
        <Object
          key={"/s3/list/" + location.pathname.split("/")[2] + "/" + obj}
          bucket={location.pathname.split("/")[2]}
          name={obj}
          needRefresh={needRefresh}
        />
      ))}
    </React.Fragment>
  );
};

export default ListObjects;
