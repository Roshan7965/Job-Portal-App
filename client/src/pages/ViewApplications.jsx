import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    // <div className="flex">
    //   {/* managed job */}
    //   <div className="bg-white mx-8 mt-10 border rounded text-sm  overflow-y-scroll">
    //     <div className="grid grid-cols-[1fr_4fr_4fr_3fr_1fr] md:grid-cols-[1fr_4fr_4fr_3fr_3fr_1fr] py-3 px-6 border-b ">
    //       <p>#</p>
    //       <p>user name</p>
    //       <p>Job Title</p>
    //       <p className="hidden md:block">Location</p>
    //       <p>Resume</p>
    //       <p>Action</p>
    //     </div>
    //     {viewApplicationsPageData.map((item, index) => (
    //       <div
    //         className="grid grid-cols-[1fr_4fr_4fr_3fr_1fr] md:grid-cols-[1fr_4fr_4fr_3fr_3fr_1fr] py-3 px-6 border-b "
    //         key={index}
    //       >
    //         <p>{index + 1}</p>
    //         <p>{item.name}</p>
    //         {/* <p>{slotDateFormat(item.date)}</p> */}
    //         <p>{item.jobTitle}</p>
    //         <p className="hidden md:block">{item.location}</p>
    //         <div className="flex items-center justify-center max-w-24 px-4 py-1 gap-2 rounded-md bg-blue-100 text-blue-500 ">
    //           <p>Resume</p>
    //           <img src={assets.resume_download_icon} alt="" />
    //         </div>
    //         <p className="text-center font-semibold">...</p>
    //         <p></p>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="container max-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm rounded ">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4  text-left ">#</th>
              <th className="py-3 px-4  text-left ">User name</th>
              <th className="py-3 px-4  text-left  max-sm:hidden">Job Title</th>
              <th className="py-3 px-4  text-left  max-sm:hidden">Location</th>
              <th className="py-3 px-4  text-left ">Resume</th>
              <th className="py-3 px-4  text-left ">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((item, index) => (
              <tr key={index} className="  border-b text-gray-700">
                <td className="py-2 px-4  text-left ">{index + 1}</td>
                <td className="py-2 px-4  text-left flex items-center ">
                  <img
                    className="w-10 h-10 rounded-full max-md:hidden"
                    src={item.imgSrc}
                    alt=""
                  />
                  <span className="ml-2">{item.name}</span>
                </td>
                <td className="py-2 px-4  text-left max-sm:hidden">
                  {item.jobTitle}
                </td>
                <td className="py-2 px-4  text-left max-sm:hidden">
                  {item.location}
                </td>
                <td className="py-2 px-4  text-left   ">
                  <a
                    href=""
                    target="_blank"
                    className=" px-2 py-1 inline-flex gap-1 rounded bg-blue-50 text-blue-400 "
                  >
                    Resume{" "}
                    <img
                      className=""
                      src={assets.resume_download_icon}
                      alt=""
                    />
                  </a>
                </td>
                <td className="py-2 px-4  text-left relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button">...</button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block ">
                      <button className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100">Accept</button>
                      <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
