import React, { useState, useEffect } from "react";
import Banner2 from "../common/Banner2";
//import { currentUser, provinces } from "../../../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams} from "react-router-dom";
import { usePaymentInputs } from 'react-payment-inputs';
import { isLoggedIn , currentUser} from '../helpers';

export const Checkout = () => {
  const [action, setAction] = useState([]);
  const [inputs, setInputs] = useState({});
  
  const [plan, setPlan] = useState({'title':'','price':0.0,'time':''});
  
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const handleChangeCardNumber = (e) =>{
    setInputs({...inputs,'cardNumber': e.target.value})
  }
  const handleChangeExpiryDate = (e) =>{
    setInputs({...inputs,'expiryDate' : e.target.value})
 }   
 const handleChangeCVC = (e) =>{
    setInputs({...inputs,'cvc':e.target.value})
}  
  const { id } = useParams();
  const history = useHistory();
  if(id===undefined || !isLoggedIn() ){
      history.push('/pricing');
  }
  const plans = [{'title':'Basic','price':60,'time':'month'},{'title':'Standard','price':90,'time':'month'},{'title':'Premium','price':90,'time':'month'}]  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = async (e) => {
      e.preventDefault()
    try {
     // const response = await jobService.addJob(data);
     console.log(inputs);
    } catch (error) {

    }
  };
  useEffect(()=>{
    if(id){
        setPlan({...plan,'title':plans[id-1].title,'price': plans[id-1].price,'time': plans[id-1].time});
      }
  },[])
  useEffect(()=>{
    if(id){
     
       let name =  currentUser().first_name +' '+currentUser().last_name;

        setInputs({...inputs,'uid':currentUser().id});
      }
  },[])
 
  return (
    <>
      <Banner2 title="Membership" />
      <section className="common-content dgray">
        <div className="container">
          <form>
            <div className="common-form form-field">
              <div className="row">
                <div className="col-sm-12">
                  <h4>Selected Plan </h4><br/>
                  <p></p>
                  <p>{plan.title}</p>
                  <p>${plan.price} / {plan.time}</p>
                </div>
              </div>
              {/* <h4>Billing Detail </h4><br/>

              <div className="row">
                <div className="col-sm-12">
                  <label>Name</label>
                  <input type="text" placeholder="Name" value={inputs.name} onChange={handleChange} required/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <label>Email</label>
                  <input type="text" placeholder="Email" name="email" value={inputs.email} onChange={handleChange} required/>
                </div>
              </div> */}
              <h4>Payment Detail </h4><br/>
              <div className="row">
                <div className="col-sm-12">
                  <label>Card Number </label>
                  <input {...getCardNumberProps({ onChange: handleChangeCardNumber })} value={inputs.cardNumber} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label>Expiry Date</label>
                  <input {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={inputs.expiryDate} />
                </div>
                <div className="col-sm-6">
                  <label>CVC</label>
                  <input {...getCVCProps({ onChange: handleChangeCVC })} value={inputs.cvc} />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <input
                    onClick={handleSubmit}
                    type="submit"
                    value="Submit"
                    disabled=""
                    className="btn"
                  />
                </div>
              </div>
              {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
