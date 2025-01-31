import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database is connected");
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Database connection error: ${err.message}`);
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
}

export default connectDB;
