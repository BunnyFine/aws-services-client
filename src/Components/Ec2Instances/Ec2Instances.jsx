import {
  Box,
  Button,
  Snackbar,
  Slide,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Instance from "./Instance";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Ec2Instances = () => {
  const [instances, setinstances] = useState([]);

  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const [btn, setbtn] = useState("Create Instance");
  const [insName, setinsName] = useState("");
  const [ami, setami] = useState("");
  const [open, setOpen] = useState(false);
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

  const fetchData = async () => {
    try {
      const res = await axios.get("ec2/list");
      console.log(res.data);
      setinstances(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <h1>EC2 Instances</h1>
      <Box ref={containerRef}>
        <Box sx={{ width: 200 }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleChange}
            style={{ marginBottom: "1.5rem" }}
          >
            {btn}
          </Button>
          <div></div>
          <Slide direction="up" in={checked} container={containerRef.current}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">ami</InputLabel>
              <Select
                labelId="simple-select-label"
                value={ami}
                label="ami"
                onChange={(e) => {
                  setami(e.target.value);
                }}
              >
                <MenuItem value="ami-04505e74c0741db8d">
                  Canonical, Ubuntu, 20.04 LTS, amd64
                </MenuItem>
                <MenuItem value="ami-0f9fc25dd2506cf6d">
                  Amazon Linux 2 Kernel 5.10 AMI
                </MenuItem>
              </Select>
              <br />
              <TextField
                label="Bucket"
                variant="outlined"
                style={{ border: "black" }}
                value={insName}
                onChange={(e) => {
                  setinsName(e.target.value);
                }}
                required
              />
              <br />
              <Button
                color="success"
                variant="contained"
                onClick={async (e) => {
                  try {
                    const res = await axios.post(
                      "ec2/create-instance/" + insName + "/" + ami,
                      {}
                    );
                    console.log(res.data);
                    await fetchData();
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                Create
              </Button>
            </FormControl>
          </Slide>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Instance Created"
          />
        </Box>
      </Box>
      <Instance instances={instances} />
    </React.Fragment>
  );
};

export default Ec2Instances;
