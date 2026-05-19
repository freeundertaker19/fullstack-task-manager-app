const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL;

const connectDB = async ()=>{

    try {
        await mongoose.connect(DB_URL)
        console.log("connected to DB")
    } catch (error) {
        console.log("cannot Connect to db", error)
    }
   
}

module.exports = connectDB;