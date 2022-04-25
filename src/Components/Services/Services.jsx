import React from "react";
import Ec2 from "../Ec2/Ec2";
import S3 from "../S3/S3";

const Services = () => {
  return (
    <React.Fragment>
      <h1>Hi Guest! This is knowledgehutawsid16</h1>
      <h2>Continue with any service...</h2>
      <S3 />
      <Ec2 />
    </React.Fragment>
  );
};
export default Services;
