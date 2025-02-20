import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import User from "../models/User.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized,Login again" });
  }

  try {
    const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.company = await Company.findById(decode.id).select("-password");

    next();

  } catch (error) {

    res.status(500).json({success:false,message:error.message});
  }
};


