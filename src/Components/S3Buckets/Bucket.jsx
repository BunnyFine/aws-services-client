import { Button, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

import "./bucket.css";
const Bucket = ({ bucketProps, owner, needRefresh }) => {
  const deleteHandler = async () => {
    try {
      const res = await axios.delete("/s3/delete-bucket/" + bucketProps.Name);
      needRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      {" "}
      <Paper elevation={3} className="bucket">
        <Link to={`/s3/${bucketProps.Name}`} className="link">
          <div>
            {" "}
            <h1>{bucketProps.Name}</h1>
            <h4>Owner: {owner}</h4>
          </div>
        </Link>
        <div>
          Click to load contents of the buckets
          <Button variant="contained" color="error" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Bucket;
