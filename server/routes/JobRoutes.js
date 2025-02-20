import express from "express";
import { getJobById, getJobs } from "../controllers/JobController.js";

const routes=express.Router();

//route to get all job data
routes.get('/',getJobs);

//route to get single job by id
routes.get('/:id',getJobById);



export default routes;