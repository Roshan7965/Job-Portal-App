import React from 'react';
import { useNavigate } from 'react-router-dom';


const JobCard = ({ job }) => {
  const navigate =useNavigate();
  

  return  (
    <div className="w-full 2xl:px-20 border shadow py-6 px-5 my-5 ">
        <div>
          <img className="h-8" src={job.companyId.image} alt="" />
        </div>
        <h4 className="font-medium text-lg mt-2" >{job.title}</h4>
        <div className="my-3 text-xs">
          <span className="border border-blue-200 bg-blue-50 py-1 px-2 rounded" >{job.location}</span>
          <span className="ml-2 border border-red-200 bg-red-50 py-1 px-2 rounded">{job.level}</span>
        </div>
        <p className="my-5 text-sm text-gray-500" dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
        <div className="flex gap-5">
          <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0) } } className="border text-sm sm:text-base bg-blue-500 rounded py-1.5 px-3 text-white">Apply Now</button>
          <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0) } }  className="border text-sm sm:text-base bg-white rounded py-1.5 px-3">Learn more</button>
        </div>

    </div>
  )
}
export default JobCard