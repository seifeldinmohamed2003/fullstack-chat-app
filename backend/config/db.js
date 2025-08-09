const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true


    });
      console.log('MongoDB connected successfully');
        }catch(err){
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process with failure
    }

}

export default connectDB;   
    