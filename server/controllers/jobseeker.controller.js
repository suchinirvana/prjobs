const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const createName = (name) => {
  if (name.indexOf(" ") >= 0) {
    [first_name, last_name] = name.split(" ");
  } else {
    first_name = name;
    last_name = "";
  }
  return { first_name, last_name };
};

const updateJob = async (req, res) => {
  try {
    const {
      name,
      phone,
      city,
      province,
      post_code,
      country,
      nationality,
      date_of_birth,
      marital_status,
      ielts_score,
      canadian_education,
      skills,
      total_experience,
      education,
      course,
      job_category,
      profile_detail
    } = req.body;
    const id = req.params.id;

    if (!(name && nationality && id)) {
      res.status(400).send({
        msg: "All input is required",
        success: false,
      });
    }
    
    // $sql = `SELECT * FROM tbl_user_meta WHERE user_id = ${id}`;
    //const result = await db.conn.query($sql);
    const { first_name, last_name } = createName(name);
    await db.User.update(
      {
        first_name,
        last_name,
        phone,
        city,
        province,
        post_code,
        country,
        nationality,
        date_of_birth,
        marital_status,
        ielts_score,
        canadian_education,
        skills,
        total_experience,
        education,
        course,
        job_category,
        profile_detail
      },
      { where: { id: id } }
    );

    res.status(202).send({
      msg: "Successfully updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
    updateJob
};
