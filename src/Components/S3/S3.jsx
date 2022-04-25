import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./s3.css";
const S3 = () => {
  return (
    <Link to="/s3" className="link">
      <Paper elevation={3} className="s3">
        <h1>Amazon S3</h1>
        <div>Click to load buckets</div>
      </Paper>
    </Link>
  );
};

export default S3;
