import React, { useState, useEffect } from "react";
import mapIconW from '../../../img/map-icon.png'
import ti from '../../../img/truck-icon.png'
import OwlCarousel from 'react-owl-carousel'
import { Link } from "react-router-dom";
import { employerActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../helpers";
import { EmployerCard } from "./EmployerCard";
import { employerService } from "../../../services";


export const DashboardEmployerList = () => {
    const [values, setValues] = useState([]);
    const [action, setAction] = useState({'msg' : '','deleting':false,'isDeleted':false,'hide':true});
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
      }, [setValues]);



    const options = {
        margin: 15,
        responsiveClass: true,
        nav: true,
        autoplay: false,
        navText: ["Prev", "Next"],
        smartSpeed: 1000,
        dots:false,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 3,
            }
        },
      };
console.log(values);

  return <>
<section className="common-row lgray p-t0">
  <div className="tab-wrap-nav type-2">
    <div className="container">
      <div className="flex">
        <ul className="tab-type">
          <li className="active"><a href="#">ALL EMPLOYERS</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="container">
          <div className="col-3-common flex-wrap">
  
  
  {/* <OwlCarousel className='dash-3-slider owl-carousel img-arrow' {...options}> */}

  {values.slice(0,3).map((item, index) => (
        <EmployerCard index={index} item={item} key={index} action={action}/>
    ))}

      {/* <div className="common-box"> <span className="count">01</span> <i className="icon"><img src={ti} alt="" /></i>
        <h3>KPM Automotives</h3>
        <p>Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna 
          aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco. </p>
        <p className="map-icon">33 Sage Valley Cir NW Calgary <img src={mapIconW} /></p>
        <a href="#" className="box-btn">Edit Info <i className="fa fa-pencil"></i></a> </div> */}
  {/* </OwlCarousel> */}
  </div>
  </div>
</section>


  </>;
};
