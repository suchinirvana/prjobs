import React, { useState, useEffect } from "react";
import { miscService } from "../../../services";
import { Multiselect } from "multiselect-react-dropdown";

const Languages = () => {
    const [languages, setLanguages] = useState([]);
    
      const fetchLanguages = async ()=> {
        try {
            const response = await miscService.getLanguages();
            if(response){
                let language = []
                response.data.forEach((item, index)=>{
                        language.push(item.language_title);
                })
                setLanguages([...language]);
            }
          } catch (error) {
          }
        }
        useEffect(() => {
            fetchLanguages();
        }, []);

    return (
        <>
        {languages &&  <Multiselect showArrow options={languages} showCheckbox={true} placeholder="Select language" isObject={false} />}
       
        </>
    )
}

export default Languages