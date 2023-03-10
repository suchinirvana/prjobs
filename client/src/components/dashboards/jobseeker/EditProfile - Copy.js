import React, { useState, useEffect } from "react";
import { jobseekerService, userService } from "../../../services";
import { userActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { provinces } from "../../../helpers";
import { miscService } from "../../../services";
import { currentUser } from "../../../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const EditProfile = ({ setIsEdit}) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [frmstate, setFrmstate] = useState({ message: "", submitted: false });
  const [countrylist, setCountrylist] = useState([]);
  const user_id = currentUser().id;
  const [startDate, setStartDate] = useState(null);
  const [tags, setTags] = useState([])
  const [eduvalue, setEduValue] = useState([])
  const [contentHtml, setContentHtml] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [ielts, setIelts] = useState(false)  
  
 
  

  const education_list = ["High school","Bachelor degree","Master degree","Doctorate"]

  const category_list = ["Automotive", "Construction", "Construction", "Hospitality","Logistics","Manufacturing","Software"];
 
  let dataObj = {
    nationality: "",  
    country: "",
    province: "",
    city: "",
    post_code: "",
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    marital_status: "",
    ielts_score: 0,
    canadian_education: "",
    skills:"",
    total_experience:'',
    education:'',
    job_category:'',
    course:'',
    profile_detail:''

  };
  const [inputs, setInputs] = useState({ ...dataObj });

  const updateObj = () => {
    dataObj.name = user.profile.first_name + " " + user.profile.last_name;
    dataObj.email = user.profile.email;
    dataObj.phone = user.profile.phone;
    dataObj.date_of_birth = (user.profile.date_of_birth !== null) ? user.profile.date_of_birth : '';
    dataObj.nationality = user.profile.nationality;
    dataObj.city = user.profile.city;
    dataObj.province = user.profile.province;
    dataObj.post_code = user.profile.post_code;
    dataObj.country = user.profile.country;
    dataObj.marital_status = user.profile.marital_status;
    dataObj.ielts_score = user.profile.ielts_score;
    
    dataObj.canadian_education = (user.profile.canadian_education !== false) ? 1 : 0;
    dataObj.skills = user.profile.skills;
    dataObj.total_experience = user.profile.total_experience;
    dataObj.education = user.profile.education;
    dataObj.job_category = user.profile.job_category;
    dataObj.course = user.profile.course;
    dataObj.profile_detail = user.profile.profile_detail;

    if(user.profile.ielts_score > 2){
    setIelts(true);
    }
   
    setInputs({ ...dataObj });
    if(user.profile.skills!==''){
      if(user.profile.skills.indexOf(',') > -1) { 
        let skl = user.profile.skills.split(',');
        setTags([...tags,...skl]);
      } else{
        setTags([...tags,user.profile.skills]);
      } 
    }
    if(user.profile.date_of_birth!==''){
    
      let date = new Date(user.profile.date_of_birth);
      setStartDate(date);
    }
  
   
    //setTags
  };
  useEffect(() => {
    if (user.profile) {
      updateObj();
      setShowEditor(true);
    }
  }, [user.loading]);



  const fetchCountry = async ()=> {
    try {
        const response = await miscService.getCountry();
        if(response){
            setCountrylist([...response.data]);
        }
      } catch (error) {
      }
  }
  useEffect(() => {
    fetchCountry();
  }, [setInputs]);

  const {
    nationality,
    country,
    city,
    province,
    post_code,
    name,
    email,
    phone,
    date_of_birth,
    marital_status,
    ielts_score,
    canadian_education,
    skills,
    total_experience,
    education,
    job_category,
    course,
    profile_detail

  } = inputs;
 
 

  const handleEditorChange = (e, editor) =>{
    const data = editor.getData();
    setContentHtml(data);
  } 
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleEduChange = (selected) => {
    setEduValue(selected)
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFrmstate({...frmstate, submitted: true, message: "" });
    try {
      inputs.id = user_id;
      inputs.skills = tags.toString();
      if(startDate!==null){
        inputs.date_of_birth = startDate;
      }
      if(ielts===false){
        inputs.ielts_score = 0.0;
      }
      inputs.profile_detail = contentHtml;
    
      
      const response = await jobseekerService.update(inputs);
      setFrmstate({...frmstate, submitted: false, message: response.msg });
      setIsEdit(false);
      dispatch(userActions.getById(user_id)).then(()=>{
        
        setTimeout(() => {
         
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
            <label>Nationality :</label>
          </div>
          <div className="box-in">
          <select name="nationality" value={nationality} onChange={handleChange} required>
              <option value="">--Select--</option>
              {countrylist &&  countrylist.map((option,i) => (
              <option value={option.country} key={i}>{option.country}</option>
              ))}
              
            </select>
          </div>
        </div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Country of residence at present</label>
          </div>
          <div className="box-in">
            <select name="country" value={country} onChange={handleChange} required>
              <option value="">--Select--</option>
              {countrylist &&  countrylist.map((option,i) => (
              <option value={option.country} key={i}>{option.country}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>State/Province :</label>
          </div>
          <div className="box-in">
          <input
              type="text"
              name="province"
              value={province}
              onChange={handleChange}
              required
            />
            
          </div>
        </div>
      
      </div>
      <div className="flex-field">
      <div className="box">
          <div className="box-in">
            <label>City</label>
          </div>
          <div className="box-in">
          <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              required
            />
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
              required
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
            <label>Your Phone : </label>
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
            <label>Marital Status :</label>
          </div>
          <div className="box-in">
            <select name="marital_status" value={marital_status} onChange={handleChange} required> 
              <option value="">--Select--</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
        
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Date of birth :</label>
          </div>
          <div className="box-in">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

            {/* <input
              type="text"
              name="date_of_birth"
              value={date_of_birth}
              onChange={handleChange}
              required
            /> */}
          </div>
        </div>
        <div className="box">
        <div className="box-in">
            <label>Job Category </label>
          </div>
          <select onChange={handleChange} name="job_category" value={job_category} required>
              <option value="">--Select--</option>
              { category_list.map((item,index)=>(
              <option value={item} key={index}>{item}</option>
              ))}
             
            </select>
        </div>
      </div>
      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>Educational qualification:</label>
          </div>
          <div className="box-in">
            <select onChange={handleChange} name="education" value={education} required>
              <option value="">--Select--</option>
              { education_list.map((item,index)=>(
              <option value={item} key={index}>{item}</option>
              ))}
             
            </select>
          </div>
        </div>    
        <div className="box">
          <div className="box-in">
            <label>Course name (Specialization):</label>
          </div>
          <div className="box-in">
          <input
              type="text"
              name="course"
              value={course}
              onChange={handleChange}
              required
            />
          </div>
        </div> 
      </div>      

      <div className="flex-field">
        <div className="box">
          <div className="box-in">
            <label>IELTS certificate :</label>
          </div>
          <div className="box-in">
          <label> <input type="checkBox" value="1" checked={ielts} onChange={()=>{ setIelts(!ielts)}}/>Do you have IELTS certificate? </label>
            
          </div>
        </div>
        {ielts && 
        <div className="box">   
            <div className="box-in">
              <label>IELTS Score :</label>
            </div> 
            <div className="box-in">
                <select name="ielts_score" onChange={handleChange} value={ielts ? ielts_score : 0.0} required>
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
          </div> 
}     
      </div>

      <div className="box">
          <div className="box-in">
            <label>Any Canadian education :</label>
          </div>
          <div className="box-in">
          <select name="canadian_education" value={canadian_education} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>         



      <div className="flex-field" required>
        <div className="box">
          <div className="box-in">
            <label>Skills :</label>
          </div>
          <div className="box-in">
          <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
           
          </div>
        </div>
        <div className="box">
          <div className="box-in">
            <label>Total experience :</label>
          </div>
          <div className="box-in">
            
             <select name="total_experience" value={total_experience} onChange={handleChange} required>
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
      <div className="flex-field1">
      <div className="box-in">
            <label style={{textAlign : "left" }}>About :</label>
          </div>
    
     { showEditor &&  <CKEditor editor={ ClassicEditor } onChange = {handleEditorChange} data={profile_detail} config={ {
                           
                           toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList' ]
                        } }/>   } 

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
