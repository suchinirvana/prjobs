import React, { useState, useEffect } from "react";
import { miscService } from "../../../services";
import { Multiselect } from "multiselect-react-dropdown";

const Cities = () => {
    const [cities, setCities] = useState([]);
    
      const fetchCities = async ()=> {
        try {
            const response = await miscService.getCities();
            if(response){
                let city = []
                response.data.forEach((item, index)=>{
                    city.push(item.city);
                })
                setCities([...city]);
            }
          } catch (error) {
          }
        }
        useEffect(() => {
            fetchCities();
        }, []);

    return (
        <>
        {cities &&  <Multiselect showArrow options={cities} showCheckbox={true} placeholder="Select City" isObject={false} />}
       
        </>
    )
}

export default Cities