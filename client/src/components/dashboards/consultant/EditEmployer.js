import React,{useState, useEffect} from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
//import EmployerAdUserForm from "./EmployerAdUserForm";
import {EmployerCompanyInfoForm} from "./EmployerCompanyInfoForm";
import {EmployerJobInformationForm} from "./EmployerJobInformationForm";
import { EmployerProfileEditForm } from "./EmployerProfileEditForm";
import { useDispatch, useSelector } from "react-redux";
import {employerActions } from "../../../redux/actions"
import { useParams } from "react-router-dom";
const EditEmployer = () => {
  const { id } = useParams();
  const [data, setData] = useState({})
  const dispatch = useDispatch();

  const  fetchEmployer = async () => { 
    dispatch(employerActions.getById(id)).then((data)=>{
      //setData(data.payload);
      //console.log('Done!');
    })
  }

  useEffect(() => {
    fetchEmployer();
  }, []);

  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="Edit Employer" />
      <section className="common-row dash-field lgray p-0 ex-space">
        <EmployerProfileEditForm data={data}/>
        <EmployerJobInformationForm data={data}/>
        <EmployerCompanyInfoForm data={data}/>
        {/* <EmployerAdUserForm/> */}
        <hr className="divider" />
      </section>
    </>
  );
};

export default EditEmployer;
