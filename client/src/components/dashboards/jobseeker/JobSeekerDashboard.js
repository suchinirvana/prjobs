import React from 'react';
import BannerDashboard from '../banner/BannerDashboard';
import ProfileHeader from '../profile/ProfileHeader';
import { JobState } from './JobState';
import { RecemondedJobs } from './RecemondedJobs';
import { AppliedJobs } from './AppliedJobs';

export const JobSeekerDashboard = () => {
  return<>
  <BannerDashboard/>
  <ProfileHeader bc="false" title="" />
  <section className="common-row lgray p-t0">
  <div className="tab-wrap-nav type-2">
    <div className="container">
      <div className="flex">
        <ul className="tab-type">
          <li className="active"><a href="/#">Dashboard</a></li>
        </ul>
      </div>
    </div>
  </div>
  <JobState/>
</section>

<hr className="divider"/>
<section className="common-row lgray p-0">
  <div className="tab-wrap-nav">
    <div className="container">
      <div className="flex">
        <ul className="tab-type">
          <li className="active"><a href="/#"> Recently Applied Jobs</a></li>
        </ul>
      </div>
    </div>
  </div>
  <AppliedJobs />
</section>

<hr className="divider"/>
<section className="common-row lgray p-0">
  <div className="tab-wrap-nav">
    <div className="container">
      <div className="flex">
        <ul className="tab-type">
          <li className="active"><a href="/#">Recemonded jobs</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <RecemondedJobs />
    
 
</section>


  </>;
};
