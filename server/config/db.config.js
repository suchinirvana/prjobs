  const config = require('config.json');
  const mysql = require('mysql2/promise');
  const { Sequelize } = require('sequelize');
  const {User} = require("../models/user.model");
  const {EmployerDetail} = require("../models/employer.model");
  const {Job, JobApplication} = require("../models/job.model");
  
  module.exports = db = {};
  
  initialize();
  
  async function initialize() {
      // create db if it doesn't already exist
      const { host, port, user, password, database } = config.database;
      const connection = await mysql.createConnection({ host, port, user, password, database });
      connection.connect(err => {
          if (err) throw err;
          else console.log("Database Connected!");
      });
        
  
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
      // connect to db
      const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
  
      // init models and add them to the exported db object
      db.User = User(sequelize);
      db.EmployerDetail = EmployerDetail(sequelize);
      db.Job = Job(sequelize);
      db.JobApplication = JobApplication(sequelize);
      
     
      db.conn = connection; 
  
      // sync all models with database
     await sequelize.sync();
  }


