import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { employerService } from "../../../services"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const EmployerProfileForm = () => {
    const userinfo = useSelector((state) => state.authentication.user);  
    let history = useHistory()
    const [form, setForm] = useState({
    loading: false,
    message: "",
    submitted: false,
    file : null
  });
  const {register, handleSubmit,reset,formState: { errors },} = useForm();
  const handleImage = (e)=>{
    setForm({...form, file : e.target.files[0]});
    console.log(form);
  }
  const onSubmit = async (data ) => {
    try {
        setForm({...form, submitted: true, message:''});

        const formdata = new FormData();
        for (var key in data) {
            formdata.append(key, data[key]);
        }
        if(form.file!=null)
        formdata.append('file',form.file);
        formdata.append('formtype',1);
        formdata.append('cid',userinfo.id);
        const response = await employerService.addEmployer(formdata);
        if(response.success){
          let url =  `/edit-employer/${response.data.id}`;
          window.location = url;
          // history.push(url);
           // setMessage(response.msg)
 
        }
    
    } catch (error) {
        setForm({...form, submitted: false, message:error.msg});
    }
  };

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
          </div>
        </div>
      </div>
      <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-wrap type-2">
          <div className="profile-img-box">
            <div className="lazy-image">
              <img src="" alt="" />
            </div>
            <div className="choose-file">
              <div className="flex">
                <div className="custom-choose">
                  <input type="file" onChange={handleImage} id="file1"/>
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
                      {...register("business_name", { required: true})}
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
                      {...register("business_email", { required: true})}
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
                      {...register("business_address", { required: true})}
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
                      {...register("business_phone", { required: true})}
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
                      {...register("primary_contact_name", { required: true})}
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
                      {...register("primary_contact_email", { required: true})}
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
                      {...register("primary_contact_number", { required: true})}
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
                    />
                  </div>
                </div>
              </div>
              <div className="flex-field action-row">
                <div className="box">
                  <button type="submit" className="btn md-btn t-n" disabled = {form.submitted}>
                    Submit
                  </button>
                </div>
              </div>
              {/* {message && <p className="msg">{message}</p>} */}
            
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};
