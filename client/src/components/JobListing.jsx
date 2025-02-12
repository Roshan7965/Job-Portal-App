import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations, assets } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =useContext(AppContext);
  const [showFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  
  
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(()=>{
    
    const matchesCategory= job => selectedCategories.length===0 || selectedCategories.includes(job.category);

    const matchesLocation= job => selectedLocations.length===0 || selectedLocations.includes(job.location);

    const matchesTitle =job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchSearchLocation=job => searchFilter.location==="" ||job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredData=jobs.slice().reverse().filter(
      job => matchesLocation(job) && matchesCategory(job) && matchesTitle(job) && matchSearchLocation(job)
    );

    setFilteredJobs(newFilteredData);
    setCurrentPage(1);
  },[jobs,selectedCategories,selectedLocations,searchFilter])

  const leftClick = async (page) => {
    if (page > 1) {
      setCurrentPage(page - 1);
    } else {
      setCurrentPage(page);
    }
  };

  const rightClick = async (page) => {
    if (page < Math.ceil(jobs.length / 6)) {
      setCurrentPage(page + 1);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full 2xl:px-20 flex flex-col lg:flex-row  max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white  ">
        {/* Search Filter from Hero Component  */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}
        {/* Filter Button (Visible below 1024px) */}
        <div className="block lg:hidden">
          {showFilter ? (
            <button
              className="border border-gray-500 py-1.5 rounded cursor-pointer px-6"
              onClick={() => setIsFilter(false)}
            >
              Close
            </button>
          ) : (
            <button
              className="border border-gray-500 py-1.5 rounded cursor-pointer px-6"
              onClick={() => setIsFilter(true)}
            >
              Filters
            </button>
          )}
        </div>

        {/* Sidebar Filters (Visible above 1024px) */}
        <div className="hidden lg:block">
          {/* Category sidebar */}
          <div>
            <h4 className="font-medium text-lg">Search by Categories</h4>
            <ul>
              {JobCategories?.map((category, index) => (
                <li
                  key={index}
                  className="flex gap-3 my-4 text-medium text-gray-600"
                >
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Location sidebar */}
          <div className="mt-10">
            <h4 className="font-medium text-lg">Search by Locations</h4>
            <ul>
              {JobLocations?.map((location, index) => (
                <li
                  key={index}
                  className="flex gap-3 my-4 text-medium text-gray-600"
                >
                  <input
                    type="checkbox"
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sidebar Filters (Visible below 1024px - Conditional) */}
        {showFilter && (
          <div className="block lg:hidden">
            <div>
              <h4 className="font-medium text-lg">Search by Categories</h4>
              <ul>
                {JobCategories?.map((category, index) => (
                  <li
                    key={index}
                    className="flex gap-3 my-4 text-medium text-gray-600"
                  >
                    <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h4 className="font-medium text-lg">Search by Locations</h4>
              <ul>
                {JobLocations.map((location, index) => (
                  <li
                    key={index}
                    className="flex gap-3 my-4 text-medium text-gray-600"
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocations.includes(location)}
                    />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Job opportunities section */}
      <section className="w-full  lg:w-3/4 text-gray-800 ">
        <h1 className="font-medium text-3xl py-2 " id="job-list">
          Latest jobs
        </h1>
        <p className="text-sm mb-8 text-gray-500">
          Get your desired job from top companies
        </p>
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-4">
          {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job) => {
            return <JobCard key={job._id} job={job} />;
          })}
        </div>

        {/* pagination page */}
        {jobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2  mt-10 ">
            <a href="#job-list">
              <img
                onClick={() => leftClick(currentPage)}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() => rightClick(currentPage)}
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
