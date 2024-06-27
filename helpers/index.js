const mongoose = require('mongoose');

const connectDB = async () => {
    try {
         await mongoose.connect(`${process.env.MONGODB_URI}` 
    );
    console.log("Database connected successfully");
    }
    catch (error) {
        console.log("connecttion error in helper index", error);
        process.exit(1);
    }
}


module.exports = connectDB