import { Button, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import axios from "../../axios";

import "./object.css";
const Object = ({ name, bucket, needRefresh }) => {
  const [load, setload] = useState(false);
  const deleteHandler = async () => {
    try {
      const res = await axios.delete("/s3/delete/" + bucket + "/" + name);
      needRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper elevation={3} className="object" variant="elevation">
      <div>
        <h3>{name}</h3>
        <div>Click to load contents of the object </div>
      </div>
      <div style={{ padding: "10px" }}>
        <Button
          variant="contained"
          color="error"
          onClick={deleteHandler}
          style={{ marginRight: "1rem" }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          color="success"
          onClick={async () => {
            try {
              setload(true);
              const res = await axios.get(
                "/s3/download/" + bucket + "/" + name,
                {
                  responseType: "blob",
                }
              );
              console.log(res);
              var data = new Blob([res.data], { type: res.data.type });
              console.log(data);
              var objUrl = window.URL.createObjectURL(data);
              console.log(objUrl);
              const tempLink = document.createElement("a");
              tempLink.href = objUrl;
              tempLink.setAttribute("download", name);
              tempLink.click();
              setload(false);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Download
        </Button>
        {load ? <CircularProgress /> : ""}
      </div>
    </Paper>
  );
};

export default Object;
