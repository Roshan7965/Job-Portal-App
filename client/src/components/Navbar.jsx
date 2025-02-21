import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  //console.log(user);
  const navigate = useNavigate();
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className=" shadow-lg py-4  flex flex-wrap  ">
      <div className="w-full  px-4 sm:px-[5%] 2xl:px-20 flex justify-between items-center ">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="Company Logo"
        />
        {user ? (
          <div className="flex gap-4 items-center">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p className="max-sm:hidden">|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              onClick={openSignIn}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
