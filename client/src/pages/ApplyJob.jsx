import { useContext, useEffect, useState } from "react";
import { useAsyncError, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import JobCard from "../components/JobCard";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs } = useContext(AppContext);

  const jobData = jobs.find((job) => job._id === id);
  console.log(jobData);

  const [relatedJobs, setRelatedJobs] = useState([]);

  console.log(relatedJobs);

  useEffect(() => {
    setRelatedJobs(
      jobs
        .reverse()
        .filter(
          (job) =>
            job.companyId._id === jobData.companyId._id &&
            job._id !== jobData._id
        )
        .slice(0, 4)
    );
  }, [jobData]);

  return (
    jobData && (
      <div>
        <Navbar/>
        <div className="my-10 mx-4 sm:mx-[5%]">
          {/* Card info */}
          <div className="flex justify-between flex-col lg:flex-row border  border-blue-300  mb-8 md:mb-10 shadow-lg bg-blue-50 py-12 md:py-20 rounded-2xl px-10 lg:px-16 mx-auto  gap-8 lg:gap-0  ">
            <div className="flex flex-col md:flex-row gap-10  items-center ">
              <div>
                <img
                  className="h-24 w-24 border border-gray-300 bg-white rounded-lg p-4 "
                  src={jobData.companyId.image}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <h2 className="font-medium  text-3xl sm:text-4xl max-md:text-center">
                  {jobData.title}
                </h2>
                <div className="flex gap-3 flex-wrap  text-gray-500">
                  <div className="flex gap-1 items-center">
                    <span>
                      <img src={assets.suitcase_icon} alt="" />{" "}
                    </span>
                    <span>{jobData.companyId.name}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>
                      <img src={assets.location_icon} alt="" />{" "}
                    </span>
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>
                      <img src={assets.person_icon} alt="" />{" "}
                    </span>
                    <span>{jobData.level}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span>
                      <img src={assets.money_icon} alt="" />{" "}
                    </span>
                    <span>{`CTC:${jobData.salary}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start lg:items-center lg:justify-center  ">
              <button className="bg-blue-600 text-white px-10 py-2.5 rounded-md ">
                Apply Now
              </button>
              <p className="text-sm text-gray-500 ">Posted 3 month ago</p>
            </div>
          </div>
          {/* job description  */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-28">
            <div className="w-full lg:w-2/3">
              <h1 className="text-2xl font-bold mb-4">Job description</h1>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button className="bg-blue-600 text-white px-10 py-2.5 my-5 rounded-md ">
                Apply Now
              </button>
            </div>
            <div className="w-full lg:w-1/3 mx-auto ">
              <h1 className="font-medium">More jobs from Google</h1>
              <div>
                {relatedJobs?.map((job, index) => {
                  return <JobCard job={job} index={job._id} />;
                })}
              </div>
            </div>
          </div>
          <Filter />
        </div>
      </div>
    )
  );
};

export default ApplyJob;
