import React, {useState, useEffect} from "react";
import pimage from '../../../img/usericon.svg'
import mapIcon from '../../../img/map-icon.png'
import BreadCrumb from "../breadcrumb/BreadCrumb";
import {useSelector } from 'react-redux';
import { getfileUrl } from "../../../helpers";
const ProfileHeader = ({bc, title}) => {
const user = useSelector(state => state.users);

const [values, setValues] = useState({user_image_url:'', company_name:'', first_name:'',last_name:'', province:'', city:''});

useEffect(() => {
  if (user.profile) {
    setValues({user_image_url:user.profile.user_image_url, company_name:user.profile.company_name, province:user.profile.province, city:user.profile.city, first_name:user.profile.first_name,last_name:user.profile.last_name});
  }
}, [user.loading]);

let profileImage =  (values.user_image_url!== '') ? getfileUrl(values.user_image_url) : pimage;  
let fullName = values.first_name+' '+values.last_name;

 
  return (
    <div className="profile-block">
      <div className="container">
        <div className="profile-img">
          <div className="lazy-image">
           
            <img
              src={profileImage}
              alt=""
            /> <span className="status"></span>
          </div>
        </div>
        <div className="profile-caption">
         {   fullName &&  <h3>{fullName}</h3>} 
          <h4>
          {  values.city} {  values.province && <span>, {values.province}</span>} <img src={mapIcon} alt=""/>
          </h4>
        </div>
        {(bc==="true")  && <BreadCrumb title={title}/>}
      </div>
    </div>
  );
};

export default ProfileHeader;
