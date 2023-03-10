import React from 'react'

const Education = () => {
  return (
    <>
    <div className="choice">
    <label>
      <input type="checkbox" name="Education" checked/>
      High School Diploma</label>
    <label>
      <input type="checkbox" name="Education"/>
      College Degree</label>
    <label>
      <input type="checkbox" name="Education"/>
      Post Graduate Degree</label>
    <label>
      <input type="checkbox" name="Education"/>
      Industry Specific Certification</label>
  </div>
  </>
  )
}

export default Education