import React, { useState, useEffect } from "react";
import { Banner } from "./Banner";
import { Link } from "react-router-dom";
import { jobActions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../helpers";
import { JobCard } from "./JobCard";
import { FilterRight } from "./FilterRight";
import banner from '../../img/inner-banner-big.jpg'

export const Joblist = () => {
  const [loading, setloading] = useState({
    message: "",
    loading: true,
    deleting: false,
  });
  const [values, setValues] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({title:''});

  const fetchJob = async (data) => {
   
    dispatch(jobActions.getFilterJob(filter)).then((data) => {
      if(data.payload)
      setValues([...data.payload]);
      //console.log(data);
    });
  };

  const serchByTitle = (e)=>{
    let value = e.target.value;
    setFilter({...filter, 'title':value});
    if((value==='') || (value.length < 2)){
      fetchJob({title:''});
    }
    
  }

  const handleClick = (e) => {
    let value = e.preventDefault();
    fetchJob(filter);
  }
  useEffect(() => {
    fetchJob({title:''});
  }, [setValues]);

  const style = {
    'width':'100%',
    'maxWidth':'100%'
  }
  return (
    <>
      <section className="inner-banner">
        <div
          className="bg"
          style={{backgroundImage:`url(${banner})`}}
        >
          <img src={banner} alt="" />
        </div>
        <div className="caption">
          <div className="container">
            <div className="box">
              <div className="heading">JOBS IN CANADA</div>
            </div>
          </div>
        </div>
        <div className="job-filter">
    <div className="container">
      <div className="flex">
        <div className="field-box">
          <input type="text" onChange = {serchByTitle} placeholder="Job Title, Keywords, or Phrase"/>
        </div>
        {/* <div className="field-box">
          <input type="text" placeholder="City, State or ZIP"/>
        </div> */}
        
        <div className="field-box">
          <input type="submit" value="submit" onClick={handleClick}/>
        </div>
      </div>
    </div>
  </div>
      </section>
      
      <section className="common-content dgray">
        <div className="container">
            <div className="two-aside reverse">
            <div className="aside">
              <span className="small-trigger">Filter Results</span>
              <FilterRight data={values} />
            </div>
           
              {/* <h2 className="f-30">Job Openings</h2> */}
              <div className="big-col">
              <div className="opening-row-wrap type-2">
                {/* <a href="#" className="opening">
                  <i className="icon red-bg flaticon-settings"></i>
                  <div className="box">
                    <h3>Auto Dealership Manager</h3>
                    <p>Automotive</p>
                  </div>
                  <div className="box">
                    <p className="price">20$ - 30$ an hour</p>
                    <ul className="option">
                      <li>
                        <i className="flaticon-placeholder"></i> Canada
                      </li>
                      <li>
                        <i className="flaticon-clock"></i> Full Time
                      </li>
                      <li>
                        <i className="flaticon-mortarboard"></i> High School
                        Diploma
                      </li>
                    </ul>
                  </div>
                </a> */}
                
                {values ?
                  ( values.map((job, index) => <JobCard key={index} data={job} />)) : ('No Jobs Found')}
              

              </div>
              </div>
              </div>
            
        </div>
      </section>
     
    </>
  );
};
