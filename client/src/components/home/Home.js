import React from 'react'
import Banner from "./Banner";
import GetStarted from "./GetStarted";
import JobService from "./JobService";
import JobCategory from "./JobCategory";
import Jobs from "./Jobs";
import BannerContent from "../../data/BannerContent.json";
import GetStartedContent from "../../data/GetStartedContent.json";
import JobServiceContent from "../../data/JobServiceContent.json";

const Home = ()=> {
    return (
        <>
        <Banner slider={BannerContent} />
        <GetStarted content={GetStartedContent} />
        <JobCategory />
        <JobService content={JobServiceContent} />  
        <Jobs/>
        </>
    )
}

export default Home
