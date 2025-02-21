import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment/moment";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Applications = () => {
  const { userApplication ,backendUrl ,fetchUserData } = useContext(AppContext);

 

  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(true);
  const [resume, setResume] = useState(null);
  
  //function to update resume of user
  const saveHandler = async () => {
    try {
      const token = await getToken();
  
      if (!resume) {
        toast.error("Please select a resume");
        return;
      }
  
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("resume", resume); // 'resume' should match the backend field name
  
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
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
              onClick={saveHandler}
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
        {
          userApplication?.length>0 ?(
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
            {userApplication?.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="  py-3 px-4 border-b text-left">
                    <div className="flex gap-3">
                      <img className="w-10" src={job.companyId.image} alt="" />
                      {job.companyId.name.toUpperCase()}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b text-left">{job.jobId.title}</td>
                  <td className="py-3 px-4 border-b text-left max-sm:hidden ">
                    {job.jobId.location}
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

          ):(
            <h1 className="pt-20 font-bold pb-48 text-center">Not Applied yet</h1>
          )
        }
        
        <Filter/>
      </div>
      
    </div>
  );
};

export default Applications;
