import React, { useState, useEffect } from "react";
import { userService } from "../../../services";
import { userActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { provinces } from "../../../helpers";

export const EditProfile = ({ setIsEdit}) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [frmstate, setFrmstate] = useState({ message: "", submitted: false });
  let dataObj = {
    name: "",
    email: "",
    phone: "",
    company_name: "",
    company_email: "",
    company_address: "",
    city: "",
    province: "",
    post_code: "",
    country: "",
    company_phone: "",
    ircc_id: "",
  };
  const [inputs, setInputs] = useState({ ...dataObj });

  const updateObj = () => {
    dataObj.name = user.profile.first_name + " " + user.profile.last_name;
    dataObj.email = user.profile.email;
    dataObj.phone = user.profile.phone;
    dataObj.company_name = user.profile.company_name;
    dataObj.company_email = user.profile.company_email;
    dataObj.company_address = user.profile.company_address;
    dataObj.city = user.profile.city;
    dataObj.province = user.profile.province;
    dataObj.post_code = user.profile.post_code;
    dataObj.country = user.profile.country;
    dataObj.company_phone = user.profile.company_phone;
    dataObj.ircc_id = user.profile.ircc_id;
    setInputs({ ...dataObj });
  };

  useEffect(() => {
    if (user.profile) {
      updateObj();
    }
  }, [user.loading]);

  const {
    name,
    email,
    phone,
    company_name,
    company_email,
    company_address,
    city,
    province,
    post_code,
    country,
    company_phone,
    ircc_id,
  } = inputs;



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFrmstate({...frmstate, submitted: true, message: "" });
    try {
      inputs.id = user.profile.id;
      const response = await userService.update(inputs);
      setFrmstate({...frmstate, submitted: false, message: response.msg });
      setIsEdit(false);
      dispatch(userActions.getById(user.profile.id)).then(()=>{
        setTimeout(() => {
         setIsEdit(false);
        }, 2000);
        
      })
      
    } catch (error) {
      setFrmstate({...frmstate, submitted: false, message: error.msg });
     
    }
  };

  
 
  if (user.loading) {
    //return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-field edit-ifno">
        <div className="box"></div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Company Name :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="company_name"
              value={company_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>Company Email :</label>
          </div>
          <div className="box-in">
            <input
              type="email"
              name="company_email"
              value={company_email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Company Address :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="company_address"
              value={company_address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>City :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>State/Province :</label>
          </div>
          <div className="box-in">
            <select name="province" value={province} onChange={handleChange}>
              <option value="">--Select--</option>
              {provinces().map((option,i) => (
              <option value={option.name} key={i}>{option.name}</option>
              ))}
              
            </select>
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>Zip Code :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="post_code"
              value={post_code}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Country</label>
          </div>
          <div className="box-in">
            <select name="country" value={country} onChange={handleChange}>
              <option>--Select--</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>Company Telephone :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="company_phone"
              value={company_phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Your Name : </label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>Your Email : </label>
          </div>
          <div className="box-in">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Your Number : </label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>IRCC ID :</label>
          </div>
          <div className="box-in">
            <input
              type="text"
              name="ircc_id"
              value={ircc_id}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex-field action-row">
        <div className="box">
          <button
            type="submit"
            className="btn md-btn t-n"
            disabled={frmstate.submitted}
          >
            Save changes
          </button>
        </div>
      </div>
      {frmstate.message && <p className="msg">{frmstate.message}</p>}
    </form>
  );
};
