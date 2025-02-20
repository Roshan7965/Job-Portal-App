import Company from "../models/Company.js";
import bcrypt, { compare, hash } from "bcrypt";
import generateToken from "../utils/generateToken.js";
import cloudinary from "cloudinary";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//Resister a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res
      .status(400)
      .json({ status: false , message: "company already register" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.status(409).json({ success: false, message: "user already exist" });
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    const imageUploader = await cloudinary.uploader.upload(imageFile.path);

    const newCompany= await Company.create({
        name,
        email,
        password:hashPassword,
        image:imageUploader.secure_url,
    })

    res.json({
        success:true,
        company:{
            _id:newCompany._id,
            email:newCompany.email,
            password:newCompany.password,
            image:newCompany.image,
        },
        token:generateToken(newCompany._id),
        message:"Company is successfully register"});

  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};

//a company Login

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trim input values to prevent accidental login issues
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Convert email to lowercase for case-insensitive lookup
        const company = await Company.findOne({ email: email.trim().toLowerCase() });

        if (!company) {
            return res.status(404).json({ success: false, message: "Company does not exist" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, company.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Successful login response
        res.status(200).json({
            success: true,
            message: "Login successful",
            company: {
                _id: company._id,
                email: company.email,
                name: company.name,
                image: company.image,
            },
            token: generateToken(company._id),
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
// get company data
export const getCompanyData = async (req, res) => {

    try {
        const company=req.company;

        res.status(200).json({success:true,company});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }

};

// post new Job

export const postJob = async (req, res) => {
    const {title,description,location,salary,level,category}=req.body;

    const companyId=req.company._id;

    try{

        // Check if a job with the same title, description, and companyId already exists
        const existingJob = await Job.findOne({ title, description, location, companyId,salary,level, category });

        if (existingJob) {
            return res.status(409).json({ success: false, message: "Job already posted." });
        }

        const newJob=new Job({
            title,
            description,
            level,
            salary,
            category,
            location,
            date:Date.now(),
            companyId,
        })

        await newJob.save();

        res.status(200).json({success:true,newJob});


    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });

    }
    
};

// get company applicants

export const getCompanyJobApplicants = async (req, res) => {};

//get company posted job
export const getCompanyPostedJob = async (req, res) => {
     
    try {

        const companyId=req.company._id;
        
        const jobs=await Job.find({companyId});
       

        //Adding no.of Applicants in info data
        const jobsData=await Promise.all(jobs.map(async(job)=>{
            const applicants=await JobApplication.find({jobId:job._id});
            return {...job.toObject(),applicants:applicants.length}
        }))

        res.status(200).json({success:true,jobsData});
        
    } catch (error) {

        res.status(500).json({success:false,message:error.message});
        
    }

};

//change job Application status

export const changeJobApplicationStatus = async (req, res) => {};

// change job visibility

export const changeVisibility = async (req, res) => {
    try {
        const { id } = req.body;
        //console.log(id);
        const companyId = req.company._id;

        // Correct `findById()` usage
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible;
            await job.save(); // Save the changes
            return res.status(200).json({ success: true, job ,message:"change the status"});
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

