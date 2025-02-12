import mongoose from "mongoose";
import 'dotenv/config'; 


//function to connect to the MongoDB database
const connectDB = async () => {
    
        mongoose.connection.on('connected', () => {
            console.log("Database is connected");
        });
        await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`);

   
};

export default connectDB;
