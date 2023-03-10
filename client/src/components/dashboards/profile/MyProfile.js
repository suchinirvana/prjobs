import React from "react";

import { ProfileConsultant } from "./ProfileConsultant";
import { ProfileEmployer } from "./ProfileEmployer";
import { ProfileJobseeker } from "../jobseeker/ProfileJobseeker";
//import { userActions } from "../../../redux/actions";
import { useSelector } from 'react-redux';
import { currentUser } from "../../../helpers";


export const MyProfile = () => {
  const user_type = currentUser().user_type;

  const loadview = () => {
    
      if (user_type === "Consultants")  {
        return ( <ProfileConsultant/>); 
      } else if (user_type === "Employers") {
        return (<ProfileEmployer/> )
      } else if (user_type === "Job Seekers"){
        return (<ProfileJobseeker/>)
      }
  };
 
  return <>{loadview()}</>
}
