import { TableRow, TableCell } from "@mui/material";
import { useState } from "react";
const InsRow = ({ i }) => {
  const [clicked, setclicked] = useState(false);

  return (
    <TableRow
      key={i.InstanceId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className={`tablerow ${clicked ? "clicked" : "notclicked"}`}
      onClick={(e) => {
        setclicked((prev) => !prev);
      }}
    >
      <TableCell component="th" scope="row">
        {i.instanceName}
      </TableCell>
      <TableCell align="right">{i.InstanceId}</TableCell>
      <TableCell align="right">{i.InstanceType}</TableCell>
      <TableCell align="right">{i.ImageId}</TableCell>
      <TableCell align="right">{i.state}</TableCell>
      <TableCell align="right">{i.PrivateDnsName}</TableCell>
      <TableCell align="right">{i.PrivateIpAddress}</TableCell>
      <TableCell align="right">{i.PublicDnsName}</TableCell>
      <TableCell align="right">{i.PublicIpAddress}</TableCell>
      <TableCell align="right">{i.AvailabilityZone}</TableCell>
    </TableRow>
  );
};

export default InsRow;
