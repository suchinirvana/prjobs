import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({title}) => {
  return (
    <ul className="breadcrumbs">
      <li>
          <Link to="/dashboard">Home</Link>
      </li>
      <li>{title}</li>
    </ul>
  );
};

export default BreadCrumb;
