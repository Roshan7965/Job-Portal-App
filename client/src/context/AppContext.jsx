import { createContext,  useEffect,  useState } from "react";
import { assets,jobsApplied } from "../assets/assets";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();
import { useUser ,useAuth } from "@clerk/clerk-react";

export const AppContextProvider = (props) => {
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  
  const {user}=useUser();

  const {getToken}=useAuth(); 

  const [searchFilter,setSearchFilter]=useState({
    title:'',
    location:'',
  }); 
 
  
  const [isSearched,setIsSearched]=useState(false);

  const [jobs,setJobs]=useState([]);

  const [showRecruiterLogin,setShowRecruiterLogin]=useState(false);
 
  const [companyToken,setCompanyToken]=useState(null);
  const [companyData,setCompanyData]=useState(null);
  
  const [userData,setUserData]=useState(null);
  const [userApplication,setUserApplication]=useState(null);



  // const slotDateFormat =(slotDate)=>{
  //   const dateArray =slotDate.split('_');
  //   return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
  // }

  // function to fetch company data
  const fetchCompanyData=async()=>{

    try {
      const {data}= await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}});
      if(data.success){
        setCompanyData(data.company);
    
      }else{
        toast.error(data.message);
      }
    
      
    } catch (error) {
      toast.error(error.message);
    }
  }


  //Function to fetch all jobs
  const fetchJobs=async()=>{
    try {
      const {data}=await axios.get(backendUrl+"/api/jobs");


     
      if(data.success){
       setJobs(data.jobs);

      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  
  }
   
  // function to fetch user data
  const fetchUserData=async()=>{
    if(!user) return;
    try {
       
      const token=await getToken();
      
      const {data}=await axios.get(backendUrl+'/api/user/user',
        {headers:{Authorization:`Bearer ${token}`}} );
      
      if(data.success){
        setUserData(data.user);
      }else{
         toast.error(data.message);
      }
    } catch (error) {
     //console.log(error.message);
     toast.error(error.message);
    }
  }

  //function to fetch user Application to different Company

  const fetchJobApplication=async()=>{
    try {
      
      const token=await getToken();

      const {data}=await axios.get(backendUrl+"/api/user/applications",{headers:{Authorization:`Bearer ${token}`}});

      if(data.success){
        setUserApplication(data.jobList);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }



  useEffect(()=>{
    fetchJobs();
    const storedCompanyToken= localStorage.getItem('companyToken');
    if(storedCompanyToken){
      setCompanyToken(storedCompanyToken);
    }
  },[])

  useEffect(()=>{
    if(companyToken){
       fetchCompanyData();
       
    }

  },[companyToken]);

  useEffect(()=>{
    if(user){
      fetchUserData();
      fetchJobApplication();
    }

  },[user]);

  const value = {
    backendUrl,
    searchFilter,setIsSearched,
    isSearched,setSearchFilter,
    jobs,setJobs,
    showRecruiterLogin,setShowRecruiterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    userData,setUserData,fetchUserData,
    userApplication,setUserApplication

  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
