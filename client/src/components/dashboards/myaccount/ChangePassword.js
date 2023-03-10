import React,{useState,useRef} from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import { useForm } from "react-hook-form";
import {useSelector } from "react-redux";
import { userService } from "../../../services";
export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const confpass = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const id = useSelector((state) => state.authentication.user.id);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setSubmitted(true);
    setMessage("");
    try {
      data.id = id;
      const response = await userService.changePassword(data);
      setSubmitted(false);
      setMessage(response.msg);
      e.target.reset();
    } catch (error) {
      setMessage(error.msg);
      setSubmitted(false);
      //e.target.reset();
    }
  };
  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="Change Password"/>
      <section className="common-row dash-field lgray p-t0">
        <div className="tab-wrap-nav type-2">
          <div className="container">
            <div className="flex">
              <ul className="tab-type">
                <li className="active">
                  <a href="#">CHANGE PASSWORD</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="change-pass type-2">
            <div className="flex-field">
              <div className="box">
                <label>Current Password:</label>
              </div>
              <div className="box">
                <input
                  type="password"
                  {...register("currentpass", {
                    required: "Enter your existing password",
                    maxLength: {
                      value: 15,
                      message: "Password length should be < 15 character",
                    },
                    minLength: {
                      value: 6,
                      message: "Password length should be atlest 6 character",
                    },
                  })}
                />
                {errors.currentpass && (
                  <p className="error">{errors.currentpass.message}</p>
                )}
              </div>
            </div>
            <div className="flex-field">
              <div className="box">
                <label>New Password :</label>
              </div>
              <div className="box">
                <input
                  type="password"
                  {...register("newpassword", {
                    required: "Enter new password",
                    maxLength: {
                      value: 15,
                      message: "Password length should be < 15 character",
                    },
                    minLength: {
                      value: 6,
                      message: "Password length should be atlest 6 character",
                    },
                  })}
                />
                {errors.newpassword && (
                  <p className="error">{errors.newpassword.message}</p>
                )}
              </div>
            </div>

              <div className="flex-field">
                <div className="box">
                  <label>Confirm Password :</label>
                </div>
                <div className="box">
                  <input
                    ref={confpass}
                    type="password"
                    {...register("confpassword", {
                      required: "Confirm new password",
                      maxLength: {
                        value: 15,
                        message: "Password length should be < 15 character",
                      },
                      minLength: {
                        value: 6,
                        message: "Password length should be atlest 6 character",
                      },
                    })}
                  />
                  {errors.confpassword && (
                    <p className="error">{errors.confpassword.message}</p>
                  )}
                </div>
              </div>
              <div className="flex-field action-row">
                <div className="box empty"></div>
                <div className="box">
                  <button type="submit" className="btn md-btn t-n" disabled = {submitted}>
                    Save
                  </button>
                </div>
                
              </div>
              <div className="flex-field action-row">
              <div className="box empty"></div>
              <div className="box">{message && <p className={`msg col-sm-12`}>{message}</p>}   </div>
              </div>
                 
          </div>
          </form>
        </div>
      </section>
    </>
  );
};
