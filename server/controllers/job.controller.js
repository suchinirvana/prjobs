const db = require("../config/db.config");
const path = require('path');

const dataObj = () => {
  const dataField = {
    uid : "",
    job_title: "",
    job_category: "",
    employer: "",
    city: "",
    province: "",
    country : "",
    website: "",
    end_date: "",
    job_type: "",
    sallery_min: "",
    sallery_max: "",
    education: "",
    education_detail: "",
    experience: "",
    skills: "",
    job_detail: "",
    capability: "",
    documents: "",
  };
  return dataField;
};

const addJob = async (req, res) => {
    const {
      uid,
      job_title,
      job_category,
      employer,
      city,
      province,
      country,
      website,
      end_date,
      job_type,
      sallery_min,
      sallery_max,
      skills,
      education,
      job_detail,
      experience,
      ielts_score

    } = req.body;
    
    try {
      if (!(uid && job_title && employer)) {
        res.status(400).send({
          msg: "All input is required",
          success: false,
        });
      }
      let dataField = dataObj();
  
      dataField.uid = parseInt(uid);
      dataField.job_title = job_title;
      dataField.job_category = job_category;
      dataField.employer =  parseInt(employer);
      dataField.city = city;
      dataField.province = province;
      dataField.country = country;
      if(website!=''){
        dataField.website = website; 
      }
      if(ielts_score!=''){
        dataField.ielts_score = ielts_score; 
      }
      
      dataField.end_date = end_date;
      dataField.job_type = job_type;
      dataField.sallery_min = sallery_min;
      dataField.sallery_max = sallery_max;

      dataField.experience = experience;
      
      if(education!=''){
        dataField.education = education;
      }
      if(job_detail!=''){
        dataField.job_detail = job_detail;
      }
      //if(capability!='')
      //dataField.capability = capability;
      //if(documents!='')
      //dataField.documents = documents;
      const job = await db.Job.create(dataField);
  
      res.status(201).send({
        msg: "Job successfully Added",
        data: job,
        success: true,
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
};

const updateJob = async (req, res) => {
  
    let id = parseInt(req.params.id);
    const {
      uid,
      job_title,
      job_category,
      employer,
      city,
      province,
      country,
      website,
      end_date,
      job_type,
      sallery_min,
      sallery_max,
      skills,
      job_detail,
      experience,
      education,
      ielts_score

    } = req.body;
    try {
      

      if (!(uid && job_title)) {
        res.status(400).send({
          msg: "All input is required",
          success: false,
        });
      }
      
      let datafield = {};
      datafield.uid = parseInt(uid);
      datafield.job_title = job_title || '';
      datafield.job_category = job_category || '';
      datafield.employer = employer;
      datafield.city = city;
      datafield.province = province;
      datafield.country = country;
      datafield.website = website;
      datafield.end_date = end_date;
      datafield.job_type = job_type;
      datafield.sallery_min = sallery_min;
      datafield.sallery_min = sallery_min;
      
      datafield.experience = experience;
      datafield.education = education;
      datafield.skills = skills;
      datafield.job_detail = job_detail;
      datafield.ielts_score = ielts_score;

      
     // datafield.capability = capability || '';
      //datafield.documents = documents || '';
      

      const job = await db.Job.update(datafield,{ where: { id: id } });
      if(job){
        res.status(202).send({
          msg: "Successfully updated",
          success: true,
        });
      } else {
        res.status(400).send({
          msg: "Something went wrong, please try again",
          success: false,
        });
      }
    
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.Job.findByPk(id);
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getAll = async (req, res) => {
  try {
    
    //const uid = req.params.id;
    const result = await db.Job.findAll();
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getFilterJob = async (req, res) => {
  const {title} = req.body;
  try {
    
    //const uid = req.params.id;
    let query = '';
    if((title!=='') && (title.length >2) ){
     query = `SELECT * FROM tbl_jobs WHERE job_title LIKE "%${title}%"`;
  
    } else {
      query = `SELECT * FROM tbl_jobs`;
    }
    
    const result = await db.conn.query(query);
    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: {}
      });
    }


  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


const getAllByUser = async (req, res) => {
  try {
    const uid = req.params.id;
    //const result = await db.Job.findAll({ where: { uid: uid } });
    
    let query = `SELECT ta.status, tj.id, tj.job_title, tj.job_category, tj.employer, tj.city, tj.job_type, tj.sallery_min, tj.sallery_max, tj.sallery_max, tj.education, tj.experience,tj.	end_date, count(ta.job_id) as applications FROM tbl_jobs as tj LEFT JOIN tbl_job_applications as ta ON  (tj.id = ta.job_id) WHERE tj.uid = ${uid} GROUP BY tj.id ORDER BY tj.createdAt DESC`;
    const result = await db.conn.query(query);

    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteJob = async (req, res) => {  
  try {
    const id = req.params.id;
    const job = await db.Job.findByPk(id);
    //const result = await db.Job.findAll({ where: { uid: uid } });
    if(!job){
      res.status(400).send({
        success: false,
        msg: "Sorry we did not find any job",
      });
    }
    job.destroy();
    res.status(200).send({
      success: true,
      msg: 'Job deleted successfully'
    });
    
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}





const recommendedJob = async (req, res) => {
  const {
    skills
  } = req.body;
  
  try {
    if(skills==''){
      res.status(200).send({
        success: false,
        msg: "Empty skills",
        data: {}
      });
    } 
    let akl_array = [];
    if(skills.indexOf(',') > -1) { 
      akl_array = skills.split(',');
    } else{
      akl_array.push(skills);
    } 
    let sql = '';
    
    akl_array.forEach((item, index) => {
      item = item.trim();
      if(sql!=''){
        sql = sql + ' OR (skills LIKE "%'+item+'%")';
      } else {
        sql = sql + '(skills LIKE "%'+item+'%")';
      }
    })
    
   
     let query = `SELECT * FROM tbl_jobs WHERE ${sql}`;
     const result = await db.conn.query(query);
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const applyForJob = async (req, res) => {
  const {
    jobseeker_id,
    job_id,
    consultant_id
  } = req.body;
  try {
    
    if(!(jobseeker_id && job_id && consultant_id)){
      res.status(400).send({
        msg: "All input is required",
        success: false,
      });
    }
   const result = await db.JobApplication.findAll({ where: { jobseeker_id: jobseeker_id, job_id: job_id} });
    
    if(result.length){
      return res.status(200).send({
        msg: "You have already applied for this job", 
        success: result,
      });
    }
    
    const job = await db.JobApplication.create({
      job_id,
      jobseeker_id,
      consultant_id
    });
    if(job){
      res.status(201).send({
        msg: "Job application successfully sent",
        success: true,
      });
    } else {
      res.status(200).send({
        msg: "Something went wrong",
        success: false,
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}




const getJobApplications = async (req, res) => {
  const {
    type,
    uid
  } = req.body;
  
  try {
    let result = [];
    
      //const result = await db.conn.query(query);
     if(type === 'jobseekers'){
      //result = await db.JobApplication.findAll({ where: { jobseeker_id: uid} });
      let query = `SELECT ta.status, ta.createdAt, tj.id, tj.job_title, tj.job_category, tj.employer, tj.city, tj.job_type, tj.sallery_min, tj.sallery_max, tj.sallery_max, tj.education, tj.experience FROM tbl_job_applications as ta LEFT JOIN tbl_jobs as tj ON  (ta.job_id = tj.id) WHERE ta.jobseeker_id = ${uid}`;
      result = await db.conn.query(query);
    } else if(type === 'consultants'){
      let job_id = parseInt(req.body.job_id);
      //let query = `SELECT ta.status ta.status, ta.createdAt, user.first_name, user.last_name  FROM tbl_job_applications as ta LEFT JOIN tbl_users as users ON  (ta.jobseeker_id = users.id) WHERE ((ta.consultant_id = ${uid}) AND (job_id = ${job_id}))`;
      let query = `SELECT DISTINCT ta.jobseeker_id, ta.status, ta.createdAt, user.first_name, user.last_name  FROM tbl_job_applications as ta LEFT JOIN tbl_users as user ON  (ta.jobseeker_id = user.id) WHERE ta.job_id = ${job_id}`;
    
     result = await db.conn.query(query);
     }
    
    
    if (result[0]) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any job",
        data: []
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


const updateApplicationsStatus = async (req, res) => {
  const {
      job_id,
      type,
      jobseeker_id
    } = req.body;
    try {

      if(type=='jobopen'){
        let jid = parseInt(job_id);
        let uid = parseInt(jobseeker_id);
        let datafield = {'is_seen' : 1};
        const job = await db.Job.update(datafield,{ where: { job_id: jid , jobseeker_id : uid} });
        res.status(202).send({
          msg: "Successfully updated",
          success: true,
        });

      }

    } catch (err){
      
    }
}



module.exports = {
  addJob,
  updateJob,
  getById,
  getAll,
  deleteJob,
  getAllByUser,
  recommendedJob,
  getFilterJob,
  applyForJob,
  getJobApplications,
  updateApplicationsStatus

};
