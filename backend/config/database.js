const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect=()=>{
    // console.log(process.env.DATABASE_URL)
    // console.log("Connecting with the database...")
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("Connected with the database successfully.") }).catch((error)=>{
            "Error in connecting with the database."
        })
}

module.exports=dbconnect;