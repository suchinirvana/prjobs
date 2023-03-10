import React from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import EmployerAdUserForm from "./EmployerAdUserForm";
import {EmployerCompanyInfoForm} from "./EmployerCompanyInfoForm";
import {EmployerJobInformationForm} from "./EmployerJobInformationForm";
import { EmployerProfileForm } from "./EmployerProfileForm";
const AddEmployer = () => {
  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="Ad Employer" />
      <section className="common-row dash-field lgray p-0 ex-space">
        <EmployerProfileForm />
        <EmployerJobInformationForm/>
        <EmployerCompanyInfoForm />
        {/* <EmployerAdUserForm /> */}
        <hr className="divider" />
      </section>
    </>
  );
};

export default AddEmployer;
