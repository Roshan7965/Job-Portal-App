import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt=""
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome,Google</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full"
                src={assets.company_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* side panel
            <div className=''>
                <div className='w-36 pt-5 border-r'>
                    <div className='flex gap-2 px-2 py-3'>
                        <img src={assets.home_icon} alt="" />
                        <p>Manged Job</p>
                    </div>
                    <div>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Jobs</p>
                    </div>
                    <div>
                        <img src={assets.person_tick_icon} alt="" />
                        <p>View Applications</p>
                    </div>
                    
                    
                </div>
            </div> */}
      </div>

      {/* panel  */}
      <div className="flex item-start">
        {/* Left sidebar  */}
        <div className="inline-block min-h-screen  pt-5  border-r-2">
          <ul>
            <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive?'bg-blue-100 border-r-4 border-blue-500':"border-r-4 border-transparent"}`} to={"/dashboard/add-job"}>
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden" >Add Job</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive?'bg-blue-100 border-r-4 border-blue-500':"border-r-4 border-transparent"}`} to={"/dashboard/manage-jobs"}>
              <img  className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Manage jobs</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive? "bg-blue-100 border-r-4 border-blue-500" :"border-r-4 border-transparent"}`}  to={"/dashboard/view-applications"}>
              <img  className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div>
           
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
