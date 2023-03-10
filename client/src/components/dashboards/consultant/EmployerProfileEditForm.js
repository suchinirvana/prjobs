import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { employerService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { currentUser } from "../../../helpers";
export const EmployerProfileEditForm = () => {
  const userinfo = currentUser();
  const data = useSelector((state) => state.employerDetail);
  const { id } = useParams();
  let history = useHistory();
  const [form, setForm] = useState({
    loading: false,
    message: "",
    submitted: false,
    file: null,
  });

  let dataobj = {
    business_name: "",
    business_email: "",
    business_address: "",
    business_phone: "",
    primary_contact_name: "",
    primary_contact_email: "",
    eprimary_contact_number: "",
    eprimary_contact_job_title: "",
    profile_image: "",
  };
  const [values, setValues] = useState({...dataobj});
  const  updateObj = ()=>{
    
    dataobj.business_name = data.detail.business_name;
    dataobj.business_email = data.detail.business_email;
    dataobj.business_address = data.detail.business_address;
    dataobj.business_phone = data.detail.business_phone;
    dataobj.primary_contact_name = data.detail.primary_contact_name;
    dataobj.primary_contact_email = data.detail.primary_contact_email;
    dataobj.primary_contact_number = data.detail.primary_contact_number;
    dataobj.primary_contact_job_title = data.detail.primary_contact_job_title;
    dataobj.profile_image = data.detail.profile_image;
    
    setValues({...dataobj});
    console.log(values);
  }
 
 
 useEffect(()=>{
     if(data.detail){
         updateObj();
      }
      console.log(data);
 },[data.loading])
  
  const {
    register,
    handleSubmit,
    reset,
    setValue, 
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    setForm({ ...form, file: e.target.files[0] });
    console.log(form);
  };

  const onSubmit = async (data) => {
    setForm({ ...form, submitted: true, message: "" });
    try {
     

      const formdata = new FormData();
      for (var key in data) {
        formdata.append(key, data[key]);
      }
      if (form.file != null) formdata.append("file", form.file);
      formdata.append("formtype", 1);
      formdata.append("cid", userinfo.id);
      formdata.append("id", id);
      const response = await employerService.updateEmployer(formdata,id);
      console.log(response)
      if (response.success) {
        setForm({ ...form, submitted: false, message: response.msg });
      
      }
    } catch (error) {
      setForm({ ...form, submitted: false, message: error.msg });
    }
  };
  //if (data.loading) return null;

  return (
    <section className="common-row lgray p-t0">
      <div className="tab-wrap-nav type-2">
        <div className="container">
          <div className="flex">
            <ul className="tab-type">
              <li className="active">
                <a href="#">EMPLOYER PROFILE</a>
              </li>
            </ul>
            <Link to="/my-employers">Back</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="profile-wrap type-2">
            <div className="profile-img-box">
              <div className="lazy-image">
                  {dataobj.profile_image!=='' ? <img src={dataobj.profile_image} alt="" /> : <img src={dataobj.profile_image} alt="" />}

              </div>
              <div className="choose-file">
                <div className="flex">
                  <div className="custom-choose">
                    <input type="file" onChange={handleImage} id="file1" />
                    <label htmlFor="file1" className="btn md-btn t-n">
                      Choose a file
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-form dash-field">
              <div className="flex-field">
                <div className="box">
                  <div className="box-in">
                    <label>Business Name :</label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("business_name", { required: true })}
                      defaultValue={values.business_name}
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-in">
                    <label>Business Email :</label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("business_email", { required: true })}
                      defaultValue={values.business_email}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-field">
                <div className="box">
                  <div className="box-in">
                    <label>Business Address :</label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("business_address", { required: true })}
                      defaultValue={values.business_address}
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-in">
                    <label>Business Telephone :</label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("business_phone", { required: true })}
                      defaultValue={values.business_phone}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-field">
                <div className="box">
                  <div className="box-in">
                    <label>Primary Contact Name : </label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      name="primary_contact_name"
                      {...register("primary_contact_name", { required: true })}
                      defaultValue={values.primary_contact_name}
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-in">
                    <label>Primary Contact Email : </label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("primary_contact_email", { required: true })}
                      defaultValue={values.primary_contact_email}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-field">
                <div className="box">
                  <div className="box-in">
                    <label>Primary Contact Number : </label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("primary_contact_number", {
                        required: true,
                      })}
                      defaultValue={values.primary_contact_number}
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-in">
                    <label>Primary Contact Job Title :</label>
                  </div>
                  <div className="box-in">
                    <input
                      type="text"
                      {...register("primary_contact_job_title")}
                      defaultValue={values.primary_contact_job_title}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-field action-row">
                <div className="box">
                  <button
                    type="submit"
                    className="btn md-btn t-n"
                    disabled={form.submitted}
                  >
                    Submit
                  </button>
                </div>
              </div>
              {form.message &&  <div className="flex-field action-row"><p className="msg">{form.message}</p></div>} 
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
