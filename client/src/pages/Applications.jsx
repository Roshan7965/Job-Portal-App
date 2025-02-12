import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment/moment";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
const Applications = () => {
  const { jobApplications } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(true);
  const [resume, setResume] = useState(null);

  return (
    <div className="">
      <Navbar/>
      <div className="flex flex-col gap-2 my-5 mx-4 sm:mx-[5%] ">
        <h1 className="font-semibold text-xl  ">Your Resume</h1>
        {isEdit ? (
          <div className="flex gap-2 items-center ">
            <label className="flex gap-2 items-center" htmlFor="resumeUpload">
              <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                Select Resume
              </p>
              <input
                className="hidden"
                id="resumeUpload"
                onChange={(e) => setResume(e.target.files[0])}
                accept="application/pdf"
                type="file"
              />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button
              onClick={() => setIsEdit(false)}
              className="bg-blue-100 text-blue-400 px-3 py-1.5 rounded-sm cursor-pointer"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex gap-2 my-2">
            <a className="bg-blue-200 text-blue-500 px-3 py-1.5 rounded-sm cursor-pointer">
              Resume
            </a>
            <button
              onClick={() => setIsEdit(true)}
              className="bg-white text-gray-400 px-3 border py-1.5 rounded-lg cursor-pointer"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div  className="mx-4 sm:mx-[5%]">
        <h2 className="font-semibold text-xl mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border rounded-lg mb-20">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left ">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="  py-3 px-4 border-b text-left">
                    <div className="flex gap-3">
                      <img src={job.logo} alt="" />
                      {job.company}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b text-left">{job.title}</td>
                  <td className="py-3 px-4 border-b text-left max-sm:hidden ">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b text-left max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-3 px-4 border-b text-left  ">
                    <button
                      className={`py-1 px-2 rounded min-w-24 ${
                        job.status === "Pending"
                          ? "text-blue-500 bg-blue-200"
                          : job.status === "Rejected"
                          ? "text-red-500 bg-red-200"
                          : "text-green-500 bg-green-200"
                      }`}
                    >
                      {job.status}
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
        <Filter/>
      </div>
      
    </div>
  );
};

export default Applications;
