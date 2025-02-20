import express from "express";
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../middleware/Multer.js";
import { protectCompany } from "../middleware/authMiddlerware.js";

const router=express.Router();

//router for company Register
router.post('/register',upload.single('image') ,registerCompany);

//company login
router.post("/login",loginCompany);

//get company data
router.get("/company",protectCompany,getCompanyData);

// post new -job
router.post("/post-job",protectCompany,postJob);

//get Applicants data of company
router.get("/applicants",protectCompany,getCompanyJobApplicants);

// get company posted job
router.get('/list-jobs',protectCompany,getCompanyPostedJob);

// change application status
router.post('/change-status',protectCompany,changeJobApplicationStatus);

// change application changeVisibility
router.post('/change-visibility',protectCompany,changeVisibility);


export default router;