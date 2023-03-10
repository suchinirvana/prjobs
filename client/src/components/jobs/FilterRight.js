import React from 'react';

export const FilterRight = ({data}) => {
const handelCheck = ()=> {

}
const category = () =>{
  let $html = [];
  if(data){
    data.map((item, index) => {
     
      if((item.job_category !=='') && $html.indexOf(item.job_category)=== -1)
      $html.push(item.job_category);
    })
  }
  return $html;
}
  return <>
       <div className="filter-wrap">
          <h3>Filter Results</h3>
          <div className="filter-box">
            <h4 className="small-trigger active">Category</h4>
            <div className="filter-data active">
              <ul>
                {category() && category().map((item, index) => (
                  <li><input type="checkBox" onChange={handelCheck} value={item} key={index}/>{item}</li>
                ))}
                {/* <li>
                  <input type="checkbox"/>
                  Automotive</li>
                <li>
                  <input type="checkbox"/>
                  Construction</li>
                <li>
                  <input type="checkbox"/>
                  Health Care </li>
                <li>
                  <input type="checkbox"/>
                  Hospitality</li>
                <li>
                  <input type="checkbox"/>
                  Logistics</li>
                <li>
                  <input type="checkbox"/>
                  Manufacturing</li> */}
              </ul>
            </div>
          </div>
          {/* <div className="filter-box">
            <h4 className="small-trigger">State/Province</h4>
            <div className="filter-data">
              <ul>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
              </ul>
            </div>
          </div> */}
          {/* <div className="filter-box">
            <h4 className="small-trigger">City</h4>
            <div className="filter-data">
              <ul>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
              </ul>
            </div>
          </div> */}
          {/* <div className="filter-box">
            <h4 className="small-trigger">Experience Level</h4>
            <div className="filter-data">
              <ul>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
              </ul>
            </div>
          </div> */}
          {/* <div className="filter-box">
            <h4 className="small-trigger">Qualification</h4>
            <div className="filter-data">
              <ul>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
                <li>
                  <input type="checkbox"/>
                  lorem ipsum</li>
              </ul>
            </div>
          </div>
          <p className="clear-all">Clear all</p> */}
        </div>


  </>;
};
