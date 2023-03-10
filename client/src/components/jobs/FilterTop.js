import React from 'react';

export const FilterTop = () => {
  return <>
    <div classNameName="job-filter">
    <div className="container">
      <div className="flex">
        <div className="field-box">
          <input type="text" placeholder="Job Title, Keywords, or Phrase"/>
        </div>
        {/* <div className="field-box">
          <input type="text" placeholder="City, State or ZIP"/>
        </div> */}
        
        <div className="field-box">
          <input type="submit" value="submit"/>
        </div>
      </div>
    </div>
  </div>
  
  </>;
};
