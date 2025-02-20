import express from "express";
import { applyForJob, getUserData,getUserJobApplication,updateUserResume } from "../controllers/UserController.js";
import upload from "../middleware/Multer.js";

const router=express.Router();

// get user data
router.get('/user',getUserData);

// Apply for a Job
router.post('/apply',applyForJob);


//get applied jobs
router.get('/applications',getUserJobApplication);

//Update user profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume);


export default router;

