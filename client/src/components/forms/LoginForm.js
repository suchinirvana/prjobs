import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { userActions, popupActions } from '../../redux/actions';
import { useLocation } from "react-router-dom";
import Loginimg from "../../img/set-profile-img.png";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  //let history = useHistory();
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const alert = useSelector(state => state.alert);
  const isModel = useSelector(state => state.popup);

  const dispatch = useDispatch();
  const location = useLocation();
  

  const onSubmit = async (data, e) => {
    
    //const { from } = location.state || { from: { pathname: "/" } };
    dispatch(userActions.login(data));
  };

  const modelActive = isModel.model ? "active" : "mfp-hide";
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
                >
                  &#10006;
                </button>
                <div className="popup-content">
                  <h3>Login</h3>
                  <div className="row set-profile-p">
                    <div className="col-sm-6">
                    
                      <img src={Loginimg} alt="" />
                    </div>
                    <div className="col-sm-6">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-field row">
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
                                    message : "Password length should be atlest 6 character"     
                                }
                              })}
                            />
                             {errors.password && <p className="error">{errors.password.message}</p>}
                          </div>
                          <div className="col-sm-12">
                            <button className="btn m-t1" disabled = {loggingIn}>
                              Login
                            </button>
                          </div>
                          {alert.message && <p className={`msg col-sm-12 ${alert.type}`}>{alert.message}</p>}
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
