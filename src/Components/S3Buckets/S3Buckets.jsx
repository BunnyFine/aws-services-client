import {
  Button,
  Box,
  Slide,
  TextField,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Axios from "../../axios";
import Bucket from "./Bucket";

const S3Buckets = () => {
  const [buckets, setBuckets] = useState([]);
  const [owner, setOwner] = useState("");
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [btn, setbtn] = useState("Add bucket");
  const [buckName, setBuckName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("Bucket already exists");
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
      const res = await Axios.get("/s3/list");
      console.log(res.data);
      setBuckets(res.data.Buckets);
      setOwner(res.data.Owner.DisplayName);
    } catch (error) {
      console.log(error);
    }
  };

  const needRefresh = () => {
    fetchdata();
  };
  useEffect(() => {
    fetchdata().then(() => {
      console.log("hi");
      setload(false);
    });
  }, []);
  return (
    <React.Fragment>
      <h1>S3 Services</h1>
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
            <TextField
              label="Bucket"
              variant="outlined"
              style={{ border: "black" }}
              value={buckName}
              onChange={(e) => {
                setBuckName(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  try {
                    const res = await Axios.post(
                      "s3/create-bucket/" + buckName,
                      {}
                    );
                    console.log(res.data);
                    if (
                      res.data.code === "BucketAlreadyExists" ||
                      res.data.code === "IllegalLocationConstraintException"
                    ) {
                      setOpen(true);
                      setmessage("Bucket already exists");
                    } else if (res.data.code === "InvalidBucketName") {
                      setOpen(true);
                      setmessage("The specified bucket is not valid");
                    } else if (res.data.Location) {
                      console.log(res.data.location);
                      await fetchdata();
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              }}
            />
          </Slide>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
          />{" "}
        </Box>
      </Box>
      {load ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        ""
      )}
      {buckets.map((bucket) => (
        <Bucket
          needRefresh={needRefresh}
          key={bucket.Name}
          bucketProps={bucket}
          owner={owner}
        />
      ))}
    </React.Fragment>
  );
};

export default S3Buckets;
