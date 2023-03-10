import React from "react";

//import { EditProfileConsultant } from "./EditProfileConsultant";
//import { EditProfileEmployer } from "./EditProfileEmployer";
import { EditProfileJobseeker } from "../jobseeker/EditProfileJobseeker";
//import { userActions } from "../../../redux/actions";
import { useSelector } from 'react-redux';
import { currentUser } from "../../../helpers";
export const EditProfile = () => {
  const user_type = currentUser().user_type;

  const loadview = () => {
    
      if (user_type === "Consultants")  {
       //return ( <EditProfileConsultant/>); 
      } else if (user_type === "Employers") {
        //return (<EditProfileEmployer/> )
      } else if (user_type === "Job Seekers"){
        return (<EditProfileJobseeker/>)
      }
  };
 
  return <>{loadview()}</>
}
