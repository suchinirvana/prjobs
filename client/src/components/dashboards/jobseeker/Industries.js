import React, { useState, useEffect } from "react";
import { miscService } from "../../../services";
import { Multiselect } from "multiselect-react-dropdown";

const Industries = () => {
    const [industry, setIndustry] = useState([]);
    
      const fetchIndustry = async ()=> {
        try {
            const response = await miscService.getIndustries();
            if(response){
                let industries = []
                response.data.forEach((item, index)=>{
                    industries.push(item.industry_title);
                })
                setIndustry([...industries]);
            }
          } catch (error) {
          }
        }
        useEffect(() => {
            fetchIndustry();
        }, []);
  return (
    <>{industry &&  <Multiselect showArrow options={industry} showCheckbox={true} placeholder="Select Industry" isObject={false} />}</>
  )
}

export default Industries