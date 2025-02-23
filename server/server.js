import './config/instrument.js'
import express from "express";
import cors from  'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from "./config/Cloudinary.js";
import JobRoutes from './routes/JobRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import axios from "axios";

//initialize express
const app =express();

//connect to database
await connectDB();
await connectCloudinary();




//Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const url = process.env.SERVER_BACKEND_URL;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

//Routes
app.get('/',(req,res)=> res.send("Api Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks);
app.use("/api/company",companyRoutes);
app.use("/api/jobs",JobRoutes);
app.use("/api/user",UserRoutes);
  

//port 
const PORT=process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log("server is running on " +`${PORT}`)
})