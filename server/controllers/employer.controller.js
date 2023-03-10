const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { response } = require("express");
const { request } = require("http");
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
//exports.imageFilter = imageFilter;

const empDataObj = () => {
  const empdatafield = {
    business_name: "",
    business_email: "",
    business_address: "",
    business_phone: "",
    primary_contact_name: "",
    primary_contact_email: "",
    primary_contact_number: "",
    primary_contact_job_title: "",
    profile_image:'',
    business_operating_name: "",
    business_legal_name: "",
    business_phone_number: "",
    business_address2: "",
    number_of_employee: "",
    business_cra_number: "",
    email_address_job_ad: "",
    scan_of_business_license: "",
    scan_of_utility_bill: "",
    scan_of_PD7A: "",
    ci_date_business_start: "",
    ci_principal_business_activity: "",
    ci_is_business_franchise: "",
    ci_noc_franchise: "",
    ci_ho_aware_of_fwa: "",
    ci_tno_employees: "",
    ci_tno_ca_employees: "",
    ci_tno_fw: "",
    ci_dye_fw: "",
    ci_huac_lmia: "",
    ci_huh_lmia_revoke: "",
    ci_addrssof_wl: "",
    ci_inc_doc: "",
    ci_t2_bsi: "",
    ci_t2_isi: "",
    ci_cla: "",
    ci_pd7_ac: "",
    ci_trp: "",

  };
  return empdatafield;
};
const test = async (req, res) => {
  return res.send(req.body);
};
const addEmployer = async (req, res) => {
  
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single("file");

  upload(req, res, async function (err) { 
   
    const formtype = req.body.formtype;
    let profile_image = '';
    if(req.file){
      profile_image = req.file.filename;
    }
  
    const {
      cid,
      business_name,
      business_email,
      business_address,
      business_phone,
      primary_contact_name,
      primary_contact_email,
      primary_contact_number,
      primary_contact_job_title,
    } = req.body;
    
    try {
     
      if (formtype !== "1") {
        res.status(400).send({
          msg: "Please fill profile form first!",
          success: false,
        });
      }
  
      if (!(cid && business_name && business_email && business_address)) {
        res.status(400).send({
          msg: "All input is required",
          success: false,
        });
      }
      
      let empdatafield = empDataObj();
  
      empdatafield.cid = parseInt(cid);
      empdatafield.business_name = business_name;
      empdatafield.business_email = business_email;
      empdatafield.business_address = business_address;
      empdatafield.business_phone = business_phone;
      empdatafield.primary_contact_name = primary_contact_name;
      empdatafield.primary_contact_email = primary_contact_email;
      empdatafield.primary_contact_number = primary_contact_number;
      empdatafield.primary_contact_job_title = primary_contact_job_title;
      if(profile_image!==''){
        empdatafield.profile_image = profile_image;
      }
     
      const employer = await db.EmployerDetail.create(empdatafield);
  
      res.status(201).send({
        msg: "Employer successfully Added",
        data: employer,
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  })
};

const updateEmployer = async (req, res) => {
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "file"
  );
  upload(req, res, async function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    let id = req.params.id;
   
    const formtype = req.body.formtype;

    try {
     

      let empdatafield = {};
      if (formtype === "1") {
        let profile_image = '';
        if(req.file){
          profile_image = req.file.filename;
        }
        const {
          cid,
          business_name,
          business_email,
          business_address,
          business_phone,
          primary_contact_name,
          primary_contact_email,
          primary_contact_number,
          primary_contact_job_title,

        } = req.body;
        if (!(cid && business_name && business_email && business_address)) {
          res.status(400).send({
            msg: "All input is required",
            success: false,
          });
        }
        empdatafield.cid = parseInt(cid);
        empdatafield.business_name = business_name;
        empdatafield.business_email = business_email;
        empdatafield.business_address = business_address;
        empdatafield.business_phone = business_phone;
        empdatafield.primary_contact_name = primary_contact_name;
        empdatafield.primary_contact_email = primary_contact_email;
        empdatafield.primary_contact_number = primary_contact_number;
        empdatafield.primary_contact_job_title = primary_contact_job_title;
        if(profile_image!=='')
        empdatafield.profile_image = profile_image;
      }
      else if (formtype === "2") {
        const {
          cid,
          business_operating_name,
          business_legal_name,
          business_phone_number,
          business_address2,
          number_of_employee,
          business_cra_number,
          email_address_job_ad,
        } = req.body;
       
        if (!(cid && business_operating_name && business_legal_name && number_of_employee)) {
          res.status(400).send({
            msg: "All input is required",
            success: false,
          });
        }
       
        empdatafield.cid = parseInt(cid);
        empdatafield.business_operating_name = business_operating_name;
        empdatafield.business_legal_name = business_legal_name;
        empdatafield.business_phone_number = business_phone_number;
        empdatafield.business_address2 = business_address2;
        empdatafield.number_of_employee = number_of_employee;
        empdatafield.business_cra_number = business_cra_number;
        empdatafield.email_address_job_ad = email_address_job_ad;
       
      } else if (formtype === "3") {
        const {
          cid,
          ci_date_business_start,
          ci_principal_business_activity,
          ci_is_business_franchise,
          ci_noc_franchise,
          ci_ho_aware_of_fwa,
          ci_tno_employees,
          ci_tno_ca_employees,
          ci_tno_fw,
          ci_dye_fw,
          ci_huac_lmia,
          ci_huh_lmia_revoke,
          ci_addrssof_wl,
        } = req.body;
        if (!(cid && ci_date_business_start)) {
          res.status(400).send({
            msg: "All input is required",
            success: false,
          });
        }
        
        empdatafield.cid = parseInt(cid);
        empdatafield.ci_date_business_start = ci_date_business_start;
        empdatafield.ci_principal_business_activity = ci_principal_business_activity;
        empdatafield.ci_is_business_franchise = ci_is_business_franchise;
        empdatafield.ci_noc_franchise = ci_noc_franchise;
        empdatafield.ci_ho_aware_of_fwa = ci_ho_aware_of_fwa;
        empdatafield.ci_tno_employees = ci_tno_employees;
        empdatafield.ci_tno_ca_employees = ci_tno_ca_employees;
        empdatafield.ci_tno_fw = ci_tno_fw;
        empdatafield.ci_dye_fw = ci_dye_fw;
        empdatafield.ci_huac_lmia = ci_huac_lmia;
        empdatafield.ci_huh_lmia_revoke = ci_huh_lmia_revoke;
        empdatafield.ci_addrssof_wl = ci_addrssof_wl;
       
        
      }
      
      const empProfile = await db.EmployerDetail.update(empdatafield,{ where: { id: id } });
      if(empProfile){
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

  });
};

const getEmployerById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.EmployerDetail.findByPk(id);
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any employer",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.EmployerDetail.destroy({ where: { id: id } });
    if (result) {
      res.status(200).send({
        msg: "Employer has been successfully deleted!",
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};


const getAllEmployer = async (req, res) => {
  try {
    const cid = req.params.id;
    const result = await db.EmployerDetail.findAll({ where: { cid: cid } });
    if (result) {
      res.status(200).send({
        data: result,
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any employer",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const employerUploads = async (req, res) => {
  const { id, action } = req.body;
  //uploadFile.single("file")
  console.log(req.file);
  try {
    if (!req.file || req.file == undefined) {
      console.log("No file found");
      res.status(400).send({
        msg: "You must select a file",
        success: false,
      });
    }

    const userMeta = await db.User.update(
      {
        user_image_url: req.file.filename,
      },
      { where: { id: id } }
    );
    if (userMeta) {
      res.status(200).send({
        msg: "Image Successfully uploaded",
        success: true,
      });
    } else {
      res.status(400).send({
        msg: "Image upload failed",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//const forgotPassword = async (req, res) => {};

module.exports = {
  addEmployer,
  updateEmployer,
  getEmployerById,
  employerUploads,
  getAllEmployer,
  deleteEmployer,
  test,
};
