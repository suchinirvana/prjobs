const { DataTypes } = require('sequelize');

function user(sequelize) {
    const attributes = {
		id : {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
		username: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		user_type: { type: DataTypes.STRING, allowNull: false },
        company_name : { type: DataTypes.STRING, allowNull: false },
        company_email: { type: DataTypes.STRING, allowNull: false },
        company_address: { type: DataTypes.STRING, allowNull: false },
		company_phone: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING(100), allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        province: { type: DataTypes.STRING, allowNull: false },
		city: { type: DataTypes.STRING, allowNull: false },
        post_code: { type: DataTypes.STRING, allowNull: false },
        date_of_birth: { type: DataTypes.DATE, allowNull: true },
        ircc_id: { type: DataTypes.STRING, allowNull: false },
        user_image_url:  { type: DataTypes.TEXT, allowNull: false },
        nationality: { type: DataTypes.STRING, allowNull: false },
        marital_status: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
        canadian_education: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},
        ielts_score: { type: DataTypes.DECIMAL(10,1), allowNull: false, defaultValue: 0.0},
        skills: { type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
        education: { type: DataTypes.TEXT, allowNull: false, defaultValue: ''},
        job_category: { type: DataTypes.STRING, allowNull: false },
        course: { type: DataTypes.STRING, allowNull: false },
        profile_detail: { type: DataTypes.TEXT, allowNull: false },
        total_experience: { type: DataTypes.STRING, allowNull: false ,  defaultValue: ''},
        reset_token: { type: DataTypes.STRING, allowNull: true },
        reset_token_expiry: { type: DataTypes.DATE, allowNull: true },
        timezone: { type: DataTypes.STRING, allowNull: false },
        verification_code: { type: DataTypes.STRING, allowNull: false },
        is_verified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},
        status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
        ismember: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},

    }; 


    return sequelize.define('tbl_users', attributes);
}

function user_meta(sequelize) {
    const attributes = {
		id : {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        company_name : { type: DataTypes.STRING, allowNull: false },
        company_email: { type: DataTypes.STRING, allowNull: false },
        company_address: { type: DataTypes.STRING, allowNull: false },
		company_phone: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING(100), allowNull: false },
        ircc_id: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        province: { type: DataTypes.STRING, allowNull: false },
		city: { type: DataTypes.STRING, allowNull: false },
        post_code: { type: DataTypes.STRING, allowNull: false },
        date_of_birth: { type: DataTypes.DATE, allowNull: false },
        user_image_url:  { type: DataTypes.TEXT, allowNull: false }
        
    };

    //return sequelize.define('tbl_user_meta', attributes);
}

module.exports.User = user;
//module.exports.UserMeta = user_meta;