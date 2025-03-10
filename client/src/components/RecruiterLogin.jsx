import React, { startTransition, useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const defaultEmail = import.meta.env.VITE_RECRUITER_EMAIL;
  const defaultPassword = import.meta.env.VITE_RECRUITER_PASSWORD;

  const navigate = useNavigate();

  const {
    showRecruiterLogin,
    setShowRecruiterLogin,
    backendUrl,
    setCompanyData,
    setCompanyToken,
  } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState(defaultPassword);
  const [email, setEmail] = useState(defaultEmail);

  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyToken(data.token);
          setCompanyData(data.company);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard/manage-jobs");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        const { data } = await axios.post(
          backendUrl + "/api/company/register",
          formData
        );
        if (data.success) {
          setCompanyToken(data.token);
          setCompanyData(data.company);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard/manage-jobs");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className=" absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        {/* <div className="flex justify-end translate-x-4 -translate-y-4">
          <img
            onClick={() => setRecruiterLogin(false)}
            className=""
            src={assets.cross_icon}
            alt=""
          />
        </div> */}

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute  top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />

        <h1 className="text-center text-2xl text-neutral-600 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex gap-2  items-center my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br />
                logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                placeholder="Email address"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" ? (
          <p className="text-blue-600 mt-2 cursor-pointer">Forgot password?</p>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="w-full  bg-blue-600 text-white py-2  border flex items-center justify-center mt-4  rounded-full"
        >
          {state === "Login"
            ? "login"
            : isTextDataSubmitted
            ? "Create account"
            : "next"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 pl-3">
            Don't have an account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 font-medium cursor-pointer pl-2"
            >
              Sign Up 
            </span>
          </p>
        ) : (
          <p className="mt-5 pl-3">
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 font-medium cursor-pointer pl-2"
            >
              Login 
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
