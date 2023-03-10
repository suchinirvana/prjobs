import React,{useState, useEffect} from 'react'
import { Banner } from './Banner'
import { useForm } from "react-hook-form";
import { currentUser, provinces } from '../../../helpers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import {employerActions } from "../../../redux/actions"
import {jobService} from "../../../services"
import { useHistory } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const AddJob = () => {
    const [frmstate, setFrmstate] = useState({ message: "", submitted: false });
    const [startDate, setStartDate] = useState(new Date());
    const {register,handleSubmit,formState: { errors }, } = useForm();
    const [tags, setTags] = useState([]);
    //const empdata = useSelector((state) => state.employerDetail);
    const [empvalues, setEmpValues] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [contentHtml, setContentHtml] = useState('')
    const [showEditor, setShowEditor] = useState(false)
    const education_list = ["High school","Bachelor degree","Master degree","Doctorate"]
    const [eduvalue, setEduValue] = useState([])
    const [ielts, setIelts] = useState(false)

  const  fetchJob = async () => { 
    dispatch(employerActions.getAll(currentUser().id)).then((data)=>{
      setEmpValues([...data.payload]);
      console.log('Done!');
    })
  }

  useEffect(() => {
    fetchJob();
  }, []);
    
  const handleEditorChange = (e, editor) =>{
    const data = editor.getData();
    setContentHtml(data);
  } 
  const hadleEducation = (e) => {
    let checked  = e.target.checked;
    let updatedList = [...eduvalue];
    if(checked){
      updatedList = [...updatedList,e.target.value];
    } else {
      updatedList.splice(updatedList.indexOf(e.target.value), 1);
    }
    setEduValue(updatedList);
  }
  const onSubmit = async (data ) => {
    setFrmstate({...frmstate,message: "",submitted: true });
    data['uid'] =  currentUser().id;
    data['end_date'] =  startDate;
    data['skills'] =  tags.toString();
    data['job_detail'] = contentHtml;
    data['education'] =  eduvalue.toString();
    try {
      const response = await jobService.addJob(data);
      setFrmstate({...frmstate,message: response.msg,submitted: false });
      //e.target.reset();
      setTimeout(()=>{
         history.push('/jobs-posted'); 
      },2000)
      console.log(response);
      
    } catch (error) {
      console.log(error);
      setFrmstate({...frmstate,message: error.msg,submitted: false });
      //e.target.reset();
    }
  }

    return (
        <>
            <Banner title="JOB POSTING"/>
            <section className="common-content dgray">
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="common-form form-field">
    
      <div className="row">
        <div className="col-sm-12">
          <label>Position / Designation of the Opening </label>
          <input type="text" placeholder="E.g. Position / Designation you are looking to hire." {...register("job_title", { required: true })}/>
          {errors.job_title && <p className="error">Please fill the required field.</p>}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <label>Job Category </label>
          <div className="box-in">
             <select {...register("job_category", { required: true })}>
              <option value="">--Select--</option>
              <option value="Automotive">Automotive</option>
              <option value="Construction">Construction</option>
              <option value="Health Care">Health Care</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Logistics">Logistics</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Software">Software</option>
            </select>
          </div>
          </div>  
          </div>
      <div className="row">
        <div className="col-sm-12">
          <label>Company Name/Employer</label>
          {/* <input type="text"  {...register("company_name", { required: true })} placeholder="E.g. ABC Corporation"/> */}
          <select {...register("employer", { required: true })}>
          <option value="">--Select--</option>
          {empvalues && empvalues.map((option,i) => (
          <option value={option.id} key={i}>{option.business_name}</option>
          ))}
          </select>
          {errors.company_name && <p className="error">Please select the required field.</p>}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <label>City</label>
          <input type="text" {...register("city", { required: true })} placeholder="E.g. Sydney"/>
        </div>

        <div className="col-sm-6">
          <label>State/Province</label>
            <select  {...register("province", { required: true })}>
              <option value="">--Select--</option>
              {provinces().map((option,i) => (
              <option value={option.name} key={i}>{option.name}</option>
              ))}
        
            </select>
            {errors.province && <p className="error">Please fill the required field.</p>}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <label>Select country</label>
            <select  value="Canada" {...register("country", { required: true })}>
              <option>--Select--</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <p className="error">Please fill the required field.</p>}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <label>Website</label>
          <input type="text" {...register("website")} placeholder="E.g. http://www.example.com"/>
        </div>
        <div className="col-sm-6">
          <label>Apply Before Date</label>
          <div className="icon-field"> <i className="fa fa-calendar-alt right"></i>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            
          </div>
        </div>
      </div>
 

      <div className="row">
        <div className="col-sm-12">
          <label>Job Type</label>
            <select {...register("job_type", { required: true })}>
              <option>--Select--</option>
              <option value="Full Time">Full Time</option>
              <option value="Hourly">Hourly</option>
            </select>
            {errors.job_type && <p className="error">Please fill the required field.</p>}
        </div>
      </div>
     

      <div className="row">
        <div className="col-sm-6">
          <label>Sallery min</label>
          <input type="number"  {...register("sallery_min", { required: true })} placeholder="E.g. 5K"/> 
          {errors.sallery_min && <p className="error">Please fill the required field.</p>}   
        </div>
        <div className="col-sm-6">
          <label>Sallery max</label>
          <input type="number"  {...register("sallery_max", { required: true })} placeholder="E.g. 20K"/>    
          {errors.sallery_max && <p className="error">Please fill the required field.</p>}   
        </div>
      </div>


      {/* <div className="row">
        
        <div className="col-sm-6">
          <label>Required Educational Qualifications</label>
          <div className="choice">
            <label>
              <input type="checkbox"/>
              High School Diploma</label>
            <label>
              <input type="checkbox"/>
              College Degree</label>
            <label>
              <input type="checkbox"/>
              Post Graduate Degree</label>
            <label>
              <input type="checkbox"/>
              Industry Specific Certification</label>
          </div>
        </div>
      </div> */}
    
      
      <div className="row">
        <div className="col-sm-12">
          <label>Years Of Experience </label>
          <div className="box-in">
             <select {...register("experience", { required: true })}>
              <option value="">--Select--</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
              <option value="6">6 Years</option>
              <option value="7">7 Years</option>
              <option value="8">8 Years</option>
              <option value="9">9 Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <label>Education qualification </label>
          {education_list.map((value,index) => (
           <label key={index}><input type="checkBox" value={value} onChange={hadleEducation}/>{value}</label>
          ))}

          </div>
      </div>

      <div className="row">
          <div className="col-sm-6">
              <label> <input type="checkBox" value="1" onChange={()=>{ setIelts(!ielts)}}/>IELTS Score Require for this job? </label>
          </div>
          { ielts && 
          <div className="col-sm-6">
              <label>Minimum IELTS score</label>
                <select {...register("ielts_score", { required: true })}>
                <option value="">---Select---</option>
                  <option value="9.0">9.0+</option>
                  <option value="8.5">8.5</option>
                  <option value="8.0">8.0</option>
                  <option value="7.5">7.5</option>
                  <option value="7.0">7.0</option>
                  <option value="6.5">6.5</option>
                  <option value="6.0">6.0</option>
                  <option value="5.5">5.5</option>
                  <option value="5.0">5.0</option>
                  <option value="4.5">4.5</option>
                  <option value="4.0">4.0</option>
                  <option value="3.5">3.5</option>
                  <option value="3.0">3.0 or less</option> 
                </select>
          </div> 
          }
      </div>

      <div className="row">
        <div className="col-sm-12">
          <label>Job Specifications & Skills</label>
          <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} placeholder="Enter Skill and then hit enter after each skill"/>

          {/* <textarea {...register("skills", { required: true })} placeholder="E.g. An in depth description of the skills required to apply for this job "></textarea>
          {errors.skills && <p className="error">Please fill the required field.</p>}  */}
        </div>
        <div className="col-sm-12">
          <label> Job Detail</label>
          <CKEditor editor={ ClassicEditor } onChange = {handleEditorChange}  config={ {
                           
                           toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList' ]
                        } }/> 
          {/* <textarea {...register("job_detail", { required: false })} placeholder="E.g. An in depth description of the additional skills required to apply for this job"></textarea> */}
        
        </div>
        {/* <div className="col-sm-12">
          <label>Work Conditions & Physical Capabilities</label>
          <textarea {...register("capability", { required: false })} placeholder="E.g. An in depth description of the work conditions and expected physical capabilities required to apply for this job "></textarea>
        </div> */}
        
        {/* <div className="col-sm-12">
          <label>Software & Business Systems</label>
          <textarea placeholder="E.g. please specify details on the softwares and business systems that the applicant would need to be aware of to apply for the position"></textarea>
        </div> */}
        {/* <div className="col-sm-12">
          <label>List Of Documentation </label>
          <textarea {...register("documents", { required: false })} placeholder="E.g. please list a set of personal documents you would require from the candidate so that they can apply for the position"></textarea>
        </div> */}
      </div>
      <div className="row">
        <div className="col-sm-12">
          <input type="submit" value="Submit Your Opening" disabled={frmstate.disabled} className="btn"/>
        </div>
      </div>
      {frmstate.message && <div className="row"> <div className="col-sm-12"><p className='msg'>{frmstate.message}</p></div></div>}
      
    </div>
    </form>
  </div>
</section>
        </>
    )
}
