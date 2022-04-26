import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
} from "@mui/material";
import { style } from "@mui/system";
import { useState } from "react";
import InsRow from "./InsRow";
import "./instance.css";

const Instance = ({ instances }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bolder" }}>
              Instance Name
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              Instance Id
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              InstanceType
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              ImageId
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              State
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              PrivateDnsName{" "}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              PrivateIpAddress{" "}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              PublicDnsName{" "}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              PublicIpAddress{" "}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bolder" }}>
              AvailabilityZone
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((i) => (
            <InsRow i={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Instance;
