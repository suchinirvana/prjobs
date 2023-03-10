import React,{useState, useEffect} from "react";
import { userService } from "../../../services";
import pimage from "../../../img/usericon.svg";
import {useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../../redux/actions";
import { getfileUrl } from "../../../helpers";
           
export const ProfileImage = ({isEdit}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users);
  const [image, setImage] = useState('');

   let profileImage =  (image!== '') ? getfileUrl(image) : pimage;
  


  useEffect(() => {
    if (user.profile) {
      setImage(user.profile.user_image_url);
    }
  }, [user.loading]);

  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);
    formData.append("action", 'USER_PROFILE_IMAGE');
    formData.append("id", user.profile.id);
   
    try {
         const response = await userService.userUploads(formData);
         if(response.success)
         dispatch(userActions.getById( user.profile.id))
        
    } catch (error) {
        console.log(error);
    }
  };
  if(user.loading){
    return null;
  }
  
  return (
    <>
      <div className="profile-img-box">
        <div className="lazy-image">
          <img src={profileImage} alt="" />
        </div>
        {isEdit && (
        <div className="choose-file">
          <div className="flex">
            <div className="custom-choose">
              <input type="file" id="file1" onChange={uploadHandler} />
              <label htmlFor="file1" className="btn md-btn t-n">
                Change Image
              </label>
            </div>
            <p>Acceptable formats: jpg and png only.Max file size is 500 kb.</p>
          </div>
        </div>)}
      </div>
    </>
  );
};
