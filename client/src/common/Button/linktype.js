import React from "react";
import { Link } from 'react-router-dom'
const LinkType = ({ classes, title, url}) => {
  return (
    <Link to={url} className={classes}>{title}</Link>
  )
 
}
export default LinkType;