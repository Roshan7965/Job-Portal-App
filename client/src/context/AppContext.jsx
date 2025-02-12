import { createContext,  useEffect,  useState } from "react";
import { assets, jobsData,jobsApplied } from "../assets/assets";
import React from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [searchFilter,setSearchFilter]=useState({
    title:'',
    location:'',
  }); 
 
  
  const [isSearched,setIsSearched]=useState(false);

  const [jobs,setJobs]=useState([]);

  const [showRecruiterLogin,setRecruiterLogin]=useState(false);

  const [jobApplications,setJobApplications]=useState([]);
  const fetchJobsApplication=async()=>{
    setJobApplications(jobsApplied);
  }

  const slotDateFormat =(slotDate)=>{
    const dateArray =slotDate.split('_');
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
  }


  //Function to fetch jobs
  const fetchJobs=async()=>{
    setJobs(jobsData)
  }
  useEffect(()=>{
    fetchJobs();
    fetchJobsApplication();
  },[])
  const value = {
    searchFilter,setIsSearched,
    isSearched,setSearchFilter,
    jobs,setJobs,
    jobApplications,setJobApplications,
    showRecruiterLogin,setRecruiterLogin,
    slotDateFormat,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
