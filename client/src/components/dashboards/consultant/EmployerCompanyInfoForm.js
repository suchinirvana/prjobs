import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { employerService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const EmployerCompanyInfoForm = () => {
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
    ci_date_business_start: "",
    ci_principal_business_activity: "",
    ci_is_business_franchise: "",
    ci_noc_franchise: "",
    ci_ho_aware_of_fwa: "",
    ci_tno_employees: "",
    ci_tno_ca_employees: "",
    ci_tno_fw: "",
    ci_dye_fw: "",
    ci_huac_lmia: "",
    ci_huh_lmia_revoke: "",
    ci_addrssof_wl: "",
  };
  const [values, setValues] = useState({ ...dataobj });
  const updateObj = () => {
    dataobj.ci_date_business_start = data.detail.ci_date_business_start;
    dataobj.ci_principal_business_activity =
      data.detail.ci_principal_business_activity;
    dataobj.ci_is_business_franchise = data.detail.ci_is_business_franchise;
    dataobj.ci_noc_franchise = data.detail.ci_noc_franchise;
    dataobj.ci_ho_aware_of_fwa = data.detail.ci_ho_aware_of_fwa;
    dataobj.ci_tno_ca_employees = data.detail.ci_tno_ca_employees;
    dataobj.ci_tno_fw = data.detail.ci_tno_fw;
    dataobj.ci_dye_fw = data.detail.ci_dye_fw;
    dataobj.ci_huac_lmia = data.detail.ci_huac_lmia;
    dataobj.ci_huh_lmia_revoke = data.detail.ci_huh_lmia_revoke;
    dataobj.ci_addrssof_wl = data.detail.ci_addrssof_wl;
    setValues({ ...dataobj });
  };

  useEffect(() => {
    if (data.detail) {
      updateObj();
    }
  }, [data.loading]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    setForm({ ...form, file: e.target.files[0] });
    console.log(form);
  };
  const onSubmit = async (data) => {
    try {
      setForm({ ...form, submitted: true, message: "" });

      const formdata = new FormData();
      for (var key in data) {
        formdata.append(key, data[key]);
      }
      if (form.file != null) formdata.append("file", form.file);
      formdata.append("formtype", 3);
      formdata.append("cid", userinfo.id);
      formdata.append("id", id);
    
      const response = await employerService.updateEmployer(formdata, id);
      setForm({ ...form, submitted: false, message: response.msg });
      console.log(response);
      if (response.success) {
      }
    } catch (error) {
      setForm({ ...form, submitted: false, message: error.msg });
    }
  };

  if (data.loading) return null;
  return (
    <>
      <hr className="divider" />
      <div className="border-heading">
        <div className="container">
          <h6>COMPANY INFORMATION</h6>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <div className="row">
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Date of Business Started : </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_date_business_start", {
                        required: true,
                      })}
                      defaultValue={values.ci_date_business_start}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Principal Business Activity : </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_principal_business_activity", {
                        required: true,
                      })}
                      defaultValue={values.ci_principal_business_activity}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Is this Business a Franchise? </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_is_business_franchise", {
                        required: true,
                      })}
                      defaultValue={values.ci_is_business_franchise}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Name of Corporation of Franchise : </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      placeholder="Leave blank if not applicable "
                      {...register("ci_noc_franchise")}
                      defaultValue={values.ci_noc_franchise}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Is the Corporate Head office aware of this Temporary Foreign
                    worker application?
                  </label>
                  <div className="inp-field">
                    <input type="text" {...register("ci_ho_aware_of_fwa")}  defaultValue={values.ci_ho_aware_of_fwa}/>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Total number of employees currently employed at the LMIA
                    work location :
                  </label>
                  <div className="inp-field">
                    <input type="text" 
                    {...register("ci_tno_employees")} 
                    defaultValue={values.ci_tno_employees}/>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Total number of Permanent Residents or Canadian Employees at
                    the work location :
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_tno_ca_employees", { required: true })}
                      defaultValue={values.ci_tno_ca_employees}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Total number of Foreign Workers as a result of previous
                    LMO’s/LMIA’s in current work location :
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_tno_fw", { required: true })}
                      defaultValue={values.ci_tno_fw}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Did you employ a Foreign Worker as a result of positive LMO
                    in the last two years, prior to December 31, 2013
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_dye_fw", { required: true })}
                      defaultValue={values.ci_dye_fw}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Have you applied and received positive LMIA on or after
                    December 31, 2013?
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_huac_lmia", { required: true })}
                      defaultValue={values.ci_huac_lmia}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w">
                  <label>
                    Have you had LMO/LMIA revoke within the previous 2 years?
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_huh_lmia_revoke", { required: true })}
                      defaultValue={values.ci_huh_lmia_revoke}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="half-field n-w v-t">
                  <label>
                    Please provide the exact lcoation (Detailed address) where
                    the Temporary Foreign Worker will be working :
                  </label>
                  <div className="inp-field">
                    <input
                      type="text"
                      {...register("ci_addrssof_wl", { required: true })}
                      defaultValue={values.ci_addrssof_wl}
                    />
                    {/* <div className="row">
                    <div className="col-xs-6">
                      <input type="text" />
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <h6 className="m-t6">ADDITIONAL DOCUMENTS REQUIRED</h6>
            <div className="row">
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Incorporation Documents : </label>
                  <div className="inp-field">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="half-field">
                  <label>T2 Schedule 100 - Balance Sheet information : </label>
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
                  <label>
                    T2 Schedule 125 - Income Statement information :{" "}
                  </label>
                  <div className="inp-field">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="half-field">
                  <label>Commercial Lease Agreement : </label>
                  <div className="inp-field">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input
                      type="text"
                      placeholder="Leave blank if not applicable "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="half-field">
                  <label>
                    PD7A Statement of Account for current Source Deductions :
                  </label>
                  <div className="inp-field">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="half-field">
                  <label>T4 Summary of Remuneration paid : </label>
                  <div className="inp-field">
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row action-row p-b5">
              <div className="col-lg-12">
                <input
                  type="submit"
                  value="Submit"
                  className="btn md-btn t-n pull-right"
                  disabled={form.submitted}
                />
              </div>
            </div>
            {form.message && <div className="row action-row p-b5"><p className="msg">{form.message}</p></div>}
          </div>
        </form>
      </div>
    </>
  );
};
