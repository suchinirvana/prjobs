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

    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('tbl_users', attributes, options);
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

    return sequelize.define('tbl_user_meta', attributes);
}

module.exports.User = user;
module.exports.UserMeta = user_meta;