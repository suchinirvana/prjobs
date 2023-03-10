import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import Loginimg from "../../img/set-profile-img.png";
import { useForm } from "react-hook-form";
import { userService } from "../../services";

import { useDispatch, useSelector } from 'react-redux';
import {popupActions } from '../../redux/actions';

export default function JobSeekerSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  //let history = useHistory();
  const isModel = useSelector(state => state.popup);
  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    setSubmitted(true);
    setMessage("");
    try {
      data['user_type'] = 'Job Seekers';
      const response = await userService.register(data);
      //console.log(response);
      setSubmitted(false);
      setMessage(response.msg);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setMessage(error.msg);
      setSubmitted(false);
      //e.target.reset();
    }
  };
  const modelActive = isModel ? "active" : "mfp-hide";
  return (
    <>
      <div className="mfp-bg"></div>
      <div className="mfp-wrap">
        <div className="mfp-container">
          <div className="mfp-content">
            <div id="loginForm" className={"common-popup " + modelActive}>
              <div className="popupInner">
                <button
                  title="Close (Esc)"
                  type="button"
                  className="mfp-close"
                  onClick={()=>dispatch(popupActions.close())}
                >&#10006;</button>
                <div className="popup-content">
                  <h3>Set Profile Up</h3>
                  <div className="row set-profile-p">
                    <div className="col-sm-6">
                      <img src={Loginimg} alt="" />
                    </div>
                    <div className="col-sm-6">
                      <form onSubmit={handleSubmit(onSubmit)}>
                      
                          <input
                              type="hidden"
                              value="Job Seeker"
                              {...register("user_type", {
                                required: true
                              })}
                            />
                        <div className="form-field row">
                          <div className="col-sm-12">
                            <label>Name</label>
                            <input
                              type="text"
                              {...register("name", {
                                required: true,
                                maxLength: 15,
                                minLength: 3,
                              })}
                            />
                            {errors.name && <p className="error">Please enter your name!</p>}
                          </div>
                          <div className="col-sm-12">
                            <label>Email</label>
                            <input
                              type="email"
                              {...register("email", {
                                required: "Enter your e-mail",
                                pattern: {
                                value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message : "Enter a valid e-mail address",
                                }
                              })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                          </div>
                         
                          <div className="col-sm-12">
                            <label>Password</label>
                            <input
                              type="password"
                              {...register("password", {
                                required: "Enter your password",
                                maxLength: {
                                    value : 20,
                                    message : "Password length should be < 20 character"
                                },
                                minLength: {
                                    value : 6,
                                    message : "Password mut include atleast 6 character"     
                                }
                              })}
                            />
                             {errors.password && <p className="error">{errors.password.message}</p>}
                          </div>
                          <div className="col-sm-12">
                            <button
                              className="btn m-t1"
                              disabled={submitted}
                            >
                              Register
                            </button>
                          </div>
                          {message != "" && <p className="msg col-sm-12">{message}</p>}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
