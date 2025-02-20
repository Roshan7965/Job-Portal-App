import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";



//get user  data
export const getUserData=async(req,res)=>{

    const userId=req.auth.userId;
    console.log(userId);
    try {
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({success:false,message:"user does not exit"});
        }

        res.status(200).json({success:true,user});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }

}

//Apply for Job
export  const applyForJob=async(req,res)=>{

    const jobId=req.body;

    const userId=req.auth.userId;

    try {

        const isAlreadyApplied=await JobApplication.find({userId,jobId});

        if(isAlreadyApplied){
            return res.status(400).json({success:false,message:"Already Applied Job"});
        }

        const jobData=await Job.findById(jobId);

        if(!jobData){
            return res.status(404).json({success:false, message:"Job Not Found"});
        }

        await JobApplication.create({
            companyId:jobData.companyId,
            userId,
            jobId,
            date:Date.now(),

        })

        res.status(200).json({success:true,message:"Job Applied successfully"});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});

    }

}

// get user Job Application
export  const getUserJobApplication=async(req,res)=>{
       
    const userId=req.auth.userId;
    try {

        const jobList=await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')     // when we use then() instead await we have to use exec()
        .exec();                                                                   //but in this case we await so no need exec() method because 
                                                                                   // await already return promise
        if(!jobList){
            return res.status(404).json({success:false,message:"No Job Application found for this user"})
        }

        return res.status(200).json({success:true,jobList});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});

    }
}

//update user Profile
export const updateUserResume=async(req,res)=>{

    try {

       const userId=req.auth.userId;

       const resumeFile= req.file;

       const userData= await User.findById(userId);

       if(resumeFile){
          const resumeUpload=await cloudinary.uploader.upload(resumeFile.path);
          userData.resume=resumeUpload.secure_url;
       }

       await userData.save();

       return res.status(200).json({success:true,message:"Resume updated"})

        
    } catch (error) {
         
        res.status(500).json({success:false,message:error.message});
    }
     
}
