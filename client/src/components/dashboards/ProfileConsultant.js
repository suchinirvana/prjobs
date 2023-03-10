import React from "react";
import profileImage from "../../img/profile-img.jpg";
import BannerDashboard from "./banner/BannerDashboard";
import ProfileHeader from "./profile/ProfileHeader";
import BreadCrumb from "./breadcrumb/BreadCrumb";
import { useForm } from "react-hook-form";

export const ProfileConsultant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const view = () => {
    return (
      <div className="profile-form dash-field">
        <div className="flex-field edit-ifno">
          <div className="box">
            <a href="#" className="btn xs-btn t-n">
              Edit Info <i className="fa fa-pencil"></i>
            </a>
          </div>
        </div>
        <div className="flex-field">
          <div className="box">
            <div className="box-in">
              <label>Company Name :</label>
            </div>
            <div className="box-in"></div>
          </div>
          <div className="box">
            <div className="box-in">
              <label>Company Email :</label>
            </div>
            <div className="box-in"></div>
          </div>
        </div>
        <div className="flex-field">
          <div className="box">
            <div className="box-in">
              <label>Company Address :</label>
            </div>
            <div className="box-in"></div>
          </div>
          <div className="box">
            <div className="box-in">
              <label>Company Telephone :</label>
            </div>
            <div className="box-in"></div>
          </div>
        </div>
        <div className="flex-field">
          <div className="box">
            <div className="box-in">
              <label>Your Name : </label>
            </div>
            <div className="box-in"></div>
          </div>
          <div className="box">
            <div className="box-in">
              <label>Your Email : </label>
            </div>
            <div className="box-in"></div>
          </div>
        </div>
        <div className="flex-field">
          <div className="box">
            <div className="box-in">
              <label>Your Number : </label>
            </div>
            <div className="box-in"></div>
          </div>
          <div className="box">
            <div className="box-in">
              <label>IRCC ID :</label>
            </div>
            <div className="box-in"></div>
          </div>
        </div>
      </div>
    );
  };

  const form = () => {
    return (
      <div className="profile-form dash-field">
        <form>
          <div className="flex-field edit-ifno">
            <div className="box"></div>
          </div>
          <div className="flex-field">
            <div className="box">
              <div className="box-in">
                <label>Company Name :</label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("company_name", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-in">
                <label>Company Email :</label>
              </div>
              <div className="box-in">
                <input
                  type="email"
                  {...register("company_email", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex-field">
            <div className="box">
              <div className="box-in">
                <label>Company Address :</label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("company_address", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-in">
                <label>Company Telephone :</label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("company_phone", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex-field">
            <div className="box">
              <div className="box-in">
                <label>Your Name : </label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-in">
                <label>Your Email : </label>
              </div>
              <div className="box-in">
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex-field">
            <div className="box">
              <div className="box-in">
                <label>Your Number : </label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("phone", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="box">
              <div className="box-in">
                <label>IRCC ID :</label>
              </div>
              <div className="box-in">
                <input
                  type="text"
                  {...register("ircc_id", {
                    required: false,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex-field action-row">
            <div className="box">
              <button type="submit" className="btn md-btn t-n">
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <BannerDashboard />
      <ProfileHeader />
      <section className="common-row lgray p-t0">
        <div className="tab-wrap-nav type-2">
          <div className="container">
            <div className="flex">
              <ul className="tab-type">
                <li className="active">
                  <a href="#">PROFILE DETAILS</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="profile-wrap">
            <div className="profile-img-box">
              <div className="lazy-image">
                <img src={profileImage} alt="" />
              </div>
              <div className="choose-file">
                <div className="flex">
                  <div className="custom-choose">
                    <input type="file" id="file1" />
                    <label for="file1" className="btn md-btn t-n">
                      Choose a file
                    </label>
                  </div>
                  <p>
                    Acceptable formats: jpg and png only.Max file size is 500 kb
                    and Min size is 70 kb.
                  </p>
                </div>
              </div>
            </div>
            {view}
          </div>
        </div>
      </section>
    </>
  );
};
