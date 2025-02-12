import AppDownLoad from "../components/AppDownLoad";
import Filter from "../components/Filter";
import Hero from "../components/hero";
import JobListing from "../components/JobListing";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-4 sm:mx-[5%]">
        <Hero />
        <JobListing />
        <AppDownLoad />
        <Filter />
      </div>
    </div>
  );
};

export default Home;
