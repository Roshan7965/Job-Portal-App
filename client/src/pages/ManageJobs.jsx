import React, { useContext } from "react";
import { manageJobsData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import moment from "moment";
import {useNavigate} from "react-router-dom"

const ManageJobs = () => {
    const {slotDateFormat}=useContext(AppContext);
    const navigate=useNavigate();
  return (
    <div className="container mx-auto p-4">
       <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm rounded" >
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left" >#</th>
              <th className="py-2 px-4 text-left" >Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden"  >Date</th>
              <th className="py-2 px-4 text-left max-sm:hidden" >Location</th>
              <th className="py-2 px-4 text-left" >Applicants</th>
              <th className="py-2 px-4 text-left" >Visible</th>
            </tr>
          </thead>
          <tbody>
            {
              manageJobsData.map((job,index)=>(
                <tr key={index} className="border-b text-gray-500">
                  <td className="py-2 px-4 text-left">{index+1}</td>
                  <td className="py-2 px-4 text-left">{job.title}</td>
                  <td className="py-2 px-4 text-left max-sm:hidden">{moment(job.date).format('ll')}</td>
                  <td className="py-2 px-4 text-left max-sm:hidden">{job.location}</td>
                  <td className="py-2 px-4 text-center">{job.applicants}</td>
                  <td className="py-2 px-4 text-left">
                    <input className="scale-125 ml-5" type="checkbox" />
                  </td>
                </tr>
                
              ))
            }
          </tbody>
        </table>
       </div>
       <div className="mt-4 flex justify-end">
        <button onClick={()=>navigate('/dashboard/add-job')} className="bg-black text-white px-4 py-2 rounded">Add jobs</button>
       </div>
    </div>
  );
};

export default ManageJobs;
