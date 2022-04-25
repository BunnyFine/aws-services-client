import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./ec2.css";
const Ec2 = () => {
  return (
    <Link to="/ec2" className="link">
      <Paper elevation={3} className="ec2">
        <h1>Amazon EC2</h1>
        <div>Click to load Instances</div>
      </Paper>
    </Link>
  );
};

export default Ec2;
