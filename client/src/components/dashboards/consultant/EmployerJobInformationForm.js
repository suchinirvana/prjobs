import React, { useState , useEffect} from "react";
import { useForm } from "react-hook-form";
import { employerService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const EmployerJobInformationForm = () => {
  const userinfo = useSelector((state) => state.authentication.user);
  const data = useSelector((state) => state.employerDetail);
  const { id } = useParams();
  const [form, setForm] = useState({
    loading: false,
    message: "",
    submitted: false,
    file: null,
  });

  let dataobj = {
    business_operating_name:'',
    business_legal_name:'',
    business_phone_number:'',
    business_address2:'',
    number_of_employee:'',
    business_cra_number:'',
    email_address_job_ad:'',
  };
  const [values, setValues] = useState({...dataobj});
  const  updateObj = ()=>{
    dataobj.business_operating_name = data.detail.business_operating_name;
    dataobj.business_legal_name = data.detail.business_legal_name;
    dataobj.business_phone_number = data.detail.business_phone_number;
    dataobj.business_address2 = data.detail.business_address2;
    dataobj.number_of_employee = data.detail.number_of_employee;
    dataobj.business_cra_number = data.detail.business_cra_number;
    dataobj.email_address_job_ad = data.detail.email_address_job_ad;
    setValues({...dataobj});
  }

 
 useEffect(()=>{
     if(data.detail){
         updateObj();
      }
 },[data.loading])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = (e)=>{
    setForm({...form, file : e.target.files[0]});
    console.log(form);
  }

  const onSubmit = async (data) => {
    setForm({ ...form, submitted: true, message: "" });
    try {
      const formdata = new FormData();
      for (var key in data) {
        formdata.append(key, data[key]);
      }
      if (form.file != null) formdata.append("file", form.file);
      formdata.append("formtype", 2);
      formdata.append("cid", userinfo.id);
      formdata.append("id", id);
      
      const response = await employerService.updateEmployer(formdata,id);
      setForm({ ...form, submitted: false, message: response.msg });
      if (response.success) {
       
      }
    } catch (error) {
      setForm({ ...form, submitted: false, message: error.msg });
    }
  };
   if (data.loading) return null;
  return (
    <>
      <div className="border-heading">
        <div className="container">
          <h6>EMPLOYER JOB BANK INFORMATION</h6>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Business Operating Name : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("business_operating_name", { required: true })}
                    defaultValue={values.business_operating_name}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="half-field">
                <label>Business Legal Name : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("business_legal_name", { required: true })}
                    defaultValue={values.business_legal_name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Business Phone Number : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("business_phone_number", { required: true })}
                    defaultValue={values.business_phone_number}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="half-field v-t">
                <label>Business Address : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("business_address2", { required: true })}
                    defaultValue={values.business_address2}
                  />
                  {/* <div className="row">
                    <div className="col-xs-6">
                      <input type="text" />
                    </div>
                    <div className="col-xs-6">
                      <input type="text" />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Number of Employees : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("number_of_employee")}
                    defaultValue={values.number_of_employee}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="half-field">
                <label>Business CRA Number : </label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("business_cra_number")}
                    defaultValue={values.business_cra_number}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Email Address for Job Advert :</label>
                <div className="inp-field">
                  <input
                    type="text"
                    {...register("email_address_job_ad")}
                    defaultValue={values.email_address_job_ad}
                  />
                </div>
              </div>
            </div>
          </div>
          <h6 className="m-t6">ADDITIONAL DOCUMENTS REQUIRED</h6>
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Scan of Business License : </label>
                <div className="inp-field">
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="half-field">
                <label>Scan of One Recent Month Utility Bill : </label>
                <div className="inp-field">
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="half-field">
                <label>Scan of One Recent Month PD7A : </label>
                <div className="inp-field">
                  <i className="fa fa-paperclip" aria-hidden="true"></i>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="row action-row p-b5">
            <div className="col-lg-12">
              <button type="submit" className="btn md-btn t-n pull-right"  disabled={form.submitted}>
                Submit
              </button>
            </div>
          </div>
          {form.message && <div className="row action-row p-b5"><p className="msg">{form.message}</p></div>}
        
        </div>
        </form>
      </div>
    </>
  );
};
