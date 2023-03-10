import React from "react";

const JobService = ({ content }) => {
  const image = content.image ? "/img/" + content.image : "";
  return (
    <section className="onestop-wrap">
      <div className="container">
        <div className="flex-wrap">
          <div className="img-box">
            <img src={image} alt="" />
          </div>
          <div className="caption">
            <p className="red">- One Stop Job Services -</p>
            <h2>Your trusted LMIA Job search partner.</h2>
            <ul className="has-icon">
              <li>
                <i className="flaticon-click"></i> Our platform is very simple
                to use, all you need to do is select the type of job you are
                looking for and leave the rest to us.
              </li>
              <li>
                <i className="flaticon-transparency"></i> Our services are 100%
                transparent, our placement specialists keep your interests at
                heart of our solutions.
              </li>
              <li>
                <i className="flaticon-guarantee"></i> We want to be the only
                job search partner you would need. You can rely on us from start
                to end. Our Specialists are a call away.
              </li>
              <li>
                <i className="flaticon-maple"></i> We have decades worth of
                experience when it comes to helping you secure a job in Canada.
                Come check it out for yourself.
              </li>
            </ul>
            <div href="#" className="job-alert">
              <h3>Job Alert!</h3>
              <p>104 new jobs are available in this week!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobService;
