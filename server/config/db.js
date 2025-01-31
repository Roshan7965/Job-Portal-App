const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database is connected");
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Database connection error: ${err.message}`);
        });

        // Check if the connection string is correct
        console.log("MongoDB URL:", process.env.MONGODB_URL);

        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,  // Optional if you're using a version of Mongoose that supports it
        });

    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;

