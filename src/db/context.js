require("dotenv").config();
const mongoose = require("mongoose");

async function connect()
{
    try
    {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    } catch (error)
    {
        console.log(error);
    }
    console.log("DB Connection established.");
}

module.exports = {connect}