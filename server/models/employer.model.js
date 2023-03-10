const { DataTypes } = require('sequelize');

function employerDetail(sequelize) {
    const attributes = {
		id : {type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey:true},
        cid : {type: DataTypes.INTEGER, allowNull: false},
        business_name: { type: DataTypes.STRING, allowNull: false },
        business_email: { type: DataTypes.STRING, allowNull: false },
        business_address: { type: DataTypes.STRING, allowNull: false },
		business_phone: { type: DataTypes.STRING(100), allowNull: false },
		primary_contact_name: { type: DataTypes.STRING, allowNull: false },
		primary_contact_email: { type: DataTypes.STRING, allowNull: false },
        primary_contact_number : { type: DataTypes.STRING, allowNull: false },
        primary_contact_job_title: { type: DataTypes.STRING, allowNull: false },
        profile_image: { type: DataTypes.STRING, allowNull: false },
        business_operating_name: { type: DataTypes.STRING, allowNull: false },
		business_legal_name: { type: DataTypes.STRING, allowNull: false },
		business_phone_number: { type: DataTypes.STRING(100), allowNull: false },
        business_address2: { type: DataTypes.STRING, allowNull: false },
        number_of_employee: { type: DataTypes.STRING, allowNull: false },
        business_cra_number: { type: DataTypes.STRING, allowNull: false },
		email_address_job_ad: { type: DataTypes.STRING, allowNull: false },
        scan_of_business_license: { type: DataTypes.STRING, allowNull: false },
        scan_of_utility_bill: { type: DataTypes.STRING, allowNull: false },
        scan_of_PD7A: { type: DataTypes.STRING, allowNull: false },
        ci_date_business_start : { type: DataTypes.STRING, allowNull: false },
        ci_principal_business_activity : { type: DataTypes.STRING, allowNull: false },
        ci_is_business_franchise : { type: DataTypes.STRING(100), allowNull: false },
        ci_noc_franchise : { type: DataTypes.STRING(100), allowNull: false },
        ci_ho_aware_of_fwa : { type: DataTypes.STRING(100), allowNull: false },
        ci_tno_employees : { type: DataTypes.STRING(100), allowNull: false },
        ci_tno_ca_employees : { type: DataTypes.STRING(100), allowNull: false },
        ci_tno_fw : { type: DataTypes.STRING(100), allowNull: false },
        ci_dye_fw : { type: DataTypes.STRING(100), allowNull: false },
        ci_huac_lmia : { type: DataTypes.STRING(100), allowNull: false },
        ci_huh_lmia_revoke : { type: DataTypes.STRING(100), allowNull: false },
        ci_addrssof_wl : { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
        ismember: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},
    };


    return sequelize.define('tbl_employer_detail', attributes);
}
module.exports.EmployerDetail = employerDetail 