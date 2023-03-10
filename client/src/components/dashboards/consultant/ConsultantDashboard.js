import React from 'react';
import BannerDashboard from '../banner/BannerDashboard';
import ProfileHeader from '../profile/ProfileHeader';
import { DashboardEmployerList } from './DashboardEmployerList';
export const ConsultantDashboard = () => {
    
  return <>
  <BannerDashboard />
   <ProfileHeader bc="false" title="" />
   <DashboardEmployerList/>
  
  </>;
};
