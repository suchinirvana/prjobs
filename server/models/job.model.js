const { DataTypes } = require('sequelize');

function job(sequelize) {
    const attributes = {
		id : {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        uid : {type: DataTypes.INTEGER, allowNull: false},
        job_title: { type: DataTypes.STRING, allowNull: false },
        job_category: { type: DataTypes.STRING, allowNull: false },
        employer: { type: DataTypes.STRING, allowNull: false },
		city: { type: DataTypes.STRING(100), allowNull: false },
		province: { type: DataTypes.STRING(100), allowNull: false },
        country : { type: DataTypes.STRING(100), allowNull: false },
        website: { type: DataTypes.STRING, allowNull: false },
        end_date: { type: DataTypes.STRING(100), allowNull: false },
        job_type: { type: DataTypes.STRING, allowNull: false },
		sallery_min: { type: DataTypes.STRING, allowNull: false },
        sallery_max: { type: DataTypes.STRING, allowNull: false },
		education: { type: DataTypes.STRING, allowNull: false },
        education_detail: { type: DataTypes.TEXT, allowNull: false },
        experience: { type: DataTypes.STRING, allowNull: false },
        skills: { type: DataTypes.TEXT, allowNull: false },
		job_detail: { type: DataTypes.TEXT, allowNull: false },
        capability: { type: DataTypes.TEXT, allowNull: false },
        documents: { type: DataTypes.TEXT, allowNull: false },
        ielts_score: { type: DataTypes.DECIMAL(10,1), allowNull: false, defaultValue: 0.0},
        status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
        is_expired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},
        views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    }; 


    return sequelize.define('tbl_jobs', attributes);
}

function JobApplication(sequelize) {
    const attributes = {
		id : {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        job_id: { type: DataTypes.INTEGER, allowNull: false },
        jobseeker_id : {type: DataTypes.INTEGER, allowNull: false},
        consultant_id: { type: DataTypes.INTEGER, allowNull: false },
        is_seen: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    }; 


    return sequelize.define('tbl_job_application', attributes);
}

module.exports.Job = job
module.exports.JobApplication = JobApplication