import React, { useState, useEffect } from "react";
import { Banner } from "./Banner";
import { currentUser, provinces, isLoggedIn, categoryIcon } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { employerActions, jobActions } from "../../redux/actions";
import { jobService } from "../../services";
import ReactHtmlParser from 'react-html-parser';
import { useHistory, useParams} from "react-router-dom";
export const ViewJob = () => {
    let dataField = {
        uid: "",
        job_title: "",
        job_category: "",
        employer: "",
        city: "",
        province: "",
        country: "",
        website: "",
        end_date: "",
        job_type: "",
        sallery_min: "",
        sallery_max: "",
        education: "",
        education_detail: "",
        experience: "",
        skills: "",
        skills2: "",
        capability: "",
        documents: "",
      };

      const jobdata = useSelector((state) => state.jobs);
      const [jobvalues, setJobValues] = useState(null);
      const [action, setAction] = useState({submitting: false,loading:false,'msg':''});
      const dispatch = useDispatch();
      const { id } = useParams();
     
      
      const fetchJob = async () => {
        dispatch(jobActions.getById(id)).then((data) => {
          setJobValues({ ...data.payload});
          //console.log("Done!");
        });
      };
 
    useEffect(() => {
        //fetchEmployer();
        fetchJob();
    }, []);



    const isDisabled = action.submitting ? 'disabled' : '';
    const applyButton = (job_id,consultant_id, isDisabled) => {

      if(isLoggedIn())
     return  <a href="#" className={`btn ${isDisabled}`} onClick={(e)=>applyJob(e,job_id,consultant_id)}>Apply for the job</a> 
      else {
      return <a href="#" className="btn" >Login To Apply</a>
      }
    } 

   const applyJob = async (e,job_id,consultant_id) => {
     e.preventDefault();
     let data = {
      job_id : job_id,
      jobseeker_id :  currentUser().id,
      consultant_id : consultant_id
     }
     setAction({...action, submitting : true})
     try {
      const response = await jobService.applyForJob(data);
      if(response.success){
        alert(response.msg);
      }
      setAction({...action, submitting : false,'msg': response.msg}) 
     } catch (error) {
      setAction({...action, submitting : false, 'msg': error.msg}) 
     }
   } 
    
      const listItem  = (value) => {
        let item = [];
        if(value!==''){
          if(value.indexOf(',') > -1) { 
            item = value.split(',');
          } else{
            item.push(value);
          }
  
        }
        return item;
      }
     
   // console.log(jobvalues);  
    return (
        <>
         <Banner title="" />
         {jobvalues && (
          <section className="common-content dgray">
  <div className="container">
    <div className="opening open-detail"> <i className={`icon red-bg ${categoryIcon(jobvalues.job_category)}`}></i>
      <div className="box">
        <h3>{jobvalues.job_title}</h3>
        {/* <p>Automotive</p> */}
        <ul className="option">
          <li><i className="flaticon-placeholder"></i> {jobvalues.city} </li>
          <li><i className="flaticon-clock"></i> {jobvalues.job_type} </li>
          <li><i className="flaticon-mortarboard"></i>{jobvalues.education} </li>
        </ul>
      </div>
      <div className="box">
        <p className="price">${jobvalues.sallery_min} - ${jobvalues.sallery_max}</p>
      </div>
    </div>
    <div className="two-aside">
      <div className="big-col">
        <div className="job-details">
          <h4>Job Description</h4>
          {ReactHtmlParser(jobvalues.job_detail)}
          {jobvalues.education && <><h5>Education</h5>
          <ul>
          {listItem(jobvalues.education) && listItem(jobvalues.education).map((item,index)=>(
             <li key={index}>{item}</li>
          ))}
          </ul></>}
          {jobvalues.skills ? (<><h5>Skills</h5> 
          <ul>
          {listItem(jobvalues.skills) && listItem(jobvalues.skills).map((item, index)=>(
             <li key={index}>{item}</li>
          ))}
          </ul></>) : ''}
    
        </div>
      </div>
      <div className="aside">
       
        <div className="apply-box"> {applyButton(jobvalues.id,jobvalues.uid, isDisabled)} </div>
      </div>
    </div>
  </div>
</section>  )}
        </>
    )
}
