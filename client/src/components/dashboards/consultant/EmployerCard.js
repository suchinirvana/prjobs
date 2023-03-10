import React from "react";
import truck from "../../../img/truck-icon.png";
import food from "../../../img/food-icon.png";
import pin from "../../../img/w-map.png";
export const EmployerCard = ({item, handleDelete, index, action}) => {
    
  let position = index + 1;
  let iseven = position % 2;
  return (
    <>
      <div className={"common-box "+ (iseven === 0 ? 'blue':'')} key={index}>
        <span className="count">{position}</span>
        <i className="icon">
          <img src={truck} alt="" />
        </i>
        <h3>{item.business_name}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <p className="map-icon">
          {item.business_address} <img src={pin} />
        </p>
        <div className="btnsec">
            <a href={`edit-employer/${item.id}`} className="box-btn">
            Edit Info <i className="fa fa-pencil"></i>
            </a>
            { !action.hide && (<a href="#" onClick={(e) => handleDelete(e,item.id)} className={"box-btn pl " + (action.deleting ? 'disabled' : '')}>
            Delete <i className="fa fa-trash-alt"></i>
            </a> )}
            
        </div>
        {/* <Link to={`edit-employer/${item.id}`} className="box-btn">Edit Info <i className="fa fa-pencil"></i></Link> */}
      </div>
    </>
  );
};
