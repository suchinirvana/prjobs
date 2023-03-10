import React, { useState, useEffect } from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";

import { Link } from "react-router-dom";
import { employerActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../helpers";
import { EmployerCard } from "./EmployerCard";
import { employerService } from "../../../services";


const MyEmployers = () => {
 // const data = useSelector((state) => state.employerDetail);
  const [values, setValues] = useState([]);
  const [action, setAction] = useState({'msg' : '','deleting':false,'isDeleted':false,'hide':false});
  const dispatch = useDispatch();

  const fetchEmployer = async () => {
    let user = currentUser();
    if (user.id) {
        dispatch(employerActions.getAll(user.id)).then((data) => {
        setValues([...data.payload]);
      });
    }
  };
  useEffect(() => {
    fetchEmployer();
  }, [dispatch]);

  const deleteEmployer = async (id)=> {
    setAction({...action,'deleting':true});
    try { 
      const response = await employerService.deleteEmployer(id);
      if(response){
        setAction({...action,'deleting':false,'msg':response.msg,'isDeleted':response.success});
        fetchEmployer();
      }
     
    } catch (error) {
      console.log(error);
      setAction({...action,'deleting':false,'msg':error.msg, 'isDeleted':error.success});

    }
  }
  const handleDelete = (e,id) =>{
    e.preventDefault()
    deleteEmployer(id); 
  }
  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="My Employers" />
      <section className="common-row lgray p-t0">
        <div className="tab-wrap-nav type-2">
          <div className="container">
            <div className="flex">
              <ul className="tab-type">
                <li className="active">
                  <a href="#">ALL EMPLOYERS</a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-3-common flex-wrap">
            {values && values.map((item, index) => (
              <EmployerCard index={index} handleDelete = {handleDelete} item={item} key={index} action={action}/>
            ))}
          </div>
          <p className="add-employer-row">
            <Link to="/add-employer" className="btn md-btn">
              
              Add Employer<i className="fa fa-plus-circle"></i>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default MyEmployers;
