import React from "react";
const EmployerAdUserForm = () => {
    return (
        <>
        <hr className="divider" />
        <div className="border-heading">
            <div className="container">
                <h6>CREATE USERS FOR EMPLOYER</h6>
            </div>
        </div>
        <div className="clearfix"></div>
        <div className="container">
            <div className="change-pass type-3">
                <div className="flex-field">
                    <div className="box">
                        <label>Employer Username: </label>
                    </div>
                    <div className="box">
                        <input type="text" />
                    </div>
                </div>
                <div className="flex-field">
                    <div className="box">
                        <label>Employer Email: </label>
                    </div>
                    <div className="box">
                        <input type="text" />
                    </div>
                </div>
                <div className="flex-field">
                    <div className="box">
                        <label>New Password :</label>
                    </div>
                    <div className="box">
                        <input type="text" />
                    </div>
                </div>
                <div className="flex-field">
                    <div className="box">
                        <label>Confirm Password :</label>
                    </div>
                    <div className="box">
                        <input type="text" />
                    </div>
                </div>
                <div className="flex-field action-row">
                    <div className="box empty"></div>
                    <div className="box">
                        <input type="submit" value="Save" className="btn md-btn t-n" />
                    </div>
                </div>
                <div className="flex-field action-row p-b5">
                    <div className="box empty"></div>
                    <div className="box">
                        <a href="#" className="btn md-btn t-n">
                            Add User <i className="fa fa-plus-circle"></i>{" "}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EmployerAdUserForm
