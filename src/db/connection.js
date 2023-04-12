const mongoose = require("mongoose");
const connection = async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (error) {
        console.log(error);
    }
    console.log("DB Connection established.");
};
connection();