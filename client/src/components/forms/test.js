import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loginimg from "../../img/set-profile-img.png";
import { useForm } from "react-hook-form";

export default function EmployerSignUpForm({ isModel, openModel, closeModel }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "",
  });
  const { name, password, email, user_type } = inputs;
  const [submitted, setSubmitted] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!(name && password && email && user_type)) {
      return false;
    }

    try {
      const END_POINT = "http://localhost:3001/api/login";
      const response = await fetch(`"${END_POINT}"`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      console.log(response);
      if (response.status === 200) {
        setInputs({ name: "", email: "", password: "", user_type: "" });
      } else {
        setLoginMessage(response.msg);
      }
      setSubmitted(false);
    } catch (error) {
      console.log(error);
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
                  onClick={closeModel}
                ></button>
                <div className="popup-content">
                  <h3>Set Profile Up</h3>
                  <div className="row set-profile-p">
                    <div className="col-sm-6">
                      <img src={Loginimg} alt="" />
                    </div>
                    <div className="col-sm-6">
                      <div className="form-field row">
                        <div className="col-sm-12">
                          <label>Name</label>
                          <input
                            type="email"
                            name="name"
                            onChange={handleChange}
                            value={name}
                            required
                          />
                        </div>
                        <div className="col-sm-12">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required
                          />
                        </div>
                        <div className="col-sm-12">
                          <label>User Type</label>
                          <select
                            name="user_type"
                            onChange={handleChange}
                            required
                          >
                            <option>--Select--</option>
                            <option
                              {...(user_type === "consultant" && "selected")}
                            >
                              Consultant
                            </option>
                            <option
                              {...(user_type === "employer" && "selected")}
                            >
                              Employer
                            </option>
                          </select>
                        </div>
                        <div className="col-sm-12">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={password}
                            required
                          />
                        </div>
                        <div className="col-sm-12">
                          <button
                            className="btn m-t1"
                            onClick={handleSubmit}
                            {...(submitted && "disabled")}
                          >
                            Register
                          </button>
                        </div>
                        {loginMessage != "" && <p>{loginMessage}</p>}
                      </div>
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
