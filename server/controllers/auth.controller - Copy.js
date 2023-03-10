const db = require("../config/db.config");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { response } = require("express");
const { generateAccessToken, authenticateToken } = require("../utils/token");

const createName = (name) => {
  if (name.indexOf(" ") >= 0) {
    [first_name, last_name] = name.split(" ");
  } else {
    first_name = name;
    last_name = "";
  }
  return { first_name, last_name };
};

const initUserMeta = async (id) => {
  const usermeta = await db.UserMeta.create({
    user_id: id,
    phone,
    company_name,
    company_address,
    company_email,
    company_phone,
    ircc_id,
    country: "",
    province: "",
    city: "",
    post_code: "",
    date_of_birth: "",
    user_image_url: "",
  });
  if (usermeta) {
    return true;
  } else {
    return false;
  }
};
const register = async (req, res) => {
  const { email, name, password, user_type } = req.body;
  try {
    if (!(email && name && password && user_type)) {
      res.status(400).send({
        msg: "All input is required",
        success: false,
      });
    }
    //const emailAlreadyExists = await db.User.findOne({ email });
    const emailAlreadyExists = await db.User.findOne({
      where: { email: email },
    });

    if (emailAlreadyExists) {
      return res.status(409).send({
        msg: "Email already exist",
        success: false,
      });
    }
    const { first_name, last_name } = createName(name);
    const hasPassword = await bcrypt.hash(password, 10);
    // const verificationToken = crypto.randomBytes(40).toString("hex");

    const username = name.replace(/\s+/g, "-").toLowerCase();

    const user = await db.User.create({
      first_name,
      last_name,
      email,
      username,
      password: hasPassword,
      user_type,
      company_name: "",
      company_email: "",
      company_address: "",
      company_phone: "",
      phone: "",
      address: "",
      country: "",
      province: "",
      city: { type: DataTypes.STRING, allowNull: false },
      post_code: "",
      date_of_birth: "",
      ircc_id: "",
      user_image_url: "",
      timezone: "",
      verification_code: "",
    });

    await initUserMeta(user.id);

    const token = generateAccessToken(user);

    res.status(201).send({
      msg: "Successfully registered",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        id: user.id,
        token: token,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        success: false,
        msg: "Empty email or password",
        data: email,
      });
    }
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      res.status(400).send({
        success: false,
        msg: "Sorry we did not find any user",
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = generateAccessToken(user);
      // save user token
      user.token = token;

      // user
      res.status(200).send({
        msg: "Successfully logged in",
        user: {
          id: user.id,
          user_type: user.user_type,
          first_name: user.first_name,
          last_name: user.last_name,
          token: token,
        },
        success: true,
      });
    } else {
      res.status(400).send({
        success: false,
        msg: "Invalid email or Password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const update = async (req, res) => {
  try {
    const {
      name,
      phone,
      company_name,
      company_address,
      company_email,
      company_phone,
      ircc_id,
    } = req.body;
    const id = req.params.id;

    if (!(name && company_name && id)) {
      res.status(400).send({
        msg: "All input is required",
        success: false,
      });
    }

    // $sql = `SELECT * FROM tbl_user_meta WHERE user_id = ${id}`;
    //const result = await db.conn.query($sql);

    await db.UserMeta.update(
      {
        phone,
        company_name,
        company_address,
        company_email,
        company_phone,
        ircc_id,
      },
      { where: { user_id: id } }
    );
    const { first_name, last_name } = createName(name);
    await db.User.update(
      {
        first_name,
        last_name,
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

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ["password", "id", "createdAt", "updatedAt"] },
    });

    //$sql = `SELECT u.id, u.first_name, u.last_name, u.email, um.company_name, um.company_email, um.company_address, um.company_phone, um.phone, um.ircc_id, um.user_image_url FROM tbl_users as u INNER JOIN tbl_user_meta as um ON u.id = um.user_id WHERE u.id = ${id}`;
    $sql = `SELECT company_name, company_email, company_address, company_phone, phone, ircc_id, user_image_url FROM tbl_user_meta WHERE user_id = ${id}`;
    const result = await db.conn.query($sql);
    if (user) {
      res.status(200).send({
        user: user,
        usermeta: result[0],
        success: true,
      });
    } else {
      res.status(400).send({
        success: false,
        msg: "Sorry we did not find any user",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const userUploads = async (req, res) => {
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
        msg: "Image Successfully uploaded",
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const forgotPassword = async (req, res) => {};
const resetPassword = async (req, res) => {};
const verifyEmail = async (req, res) => {};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  update,
  getById,
  userUploads,
};
