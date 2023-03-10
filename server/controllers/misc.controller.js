const db = require("../config/db.config");
const getCountry = async (req, res) => {
  try {
    $sql = `SELECT * FROM tbl_countries`;
    const result = await db.conn.query($sql);

    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any country",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getLanguages = async (req, res) => {
  try {
    $sql = `SELECT language_title FROM tbl_languages`;
    const result = await db.conn.query($sql);

    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any country",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getIndustries = async (req, res) => {
  try {
    $sql = `SELECT industry_title FROM tbl_industries`;
    const result = await db.conn.query($sql);

    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any country",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getCities = async (req, res) => {
  try {
    $sql = `SELECT city FROM tbl_cities WHERE country = 'CA'`;
    const result = await db.conn.query($sql);

    if (result) {
      res.status(200).send({
        data: result[0],
        success: true,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "Sorry we did not find any country",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
module.exports = {
  getCountry,
  getLanguages,
  getIndustries,
  getCities

};
