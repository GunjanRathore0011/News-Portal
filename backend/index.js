const express=require("express");
const app=express();
require("dotenv").config();
const dbconnect=require("./config/database");
// port number
const PORT=process.env.PORT;
// connect with database;
dbconnect();

// add middlewares
app.use(express.json());


// mouting routes 
const userRoute=require("./routes/authRoute");
app.use("/api/v1",userRoute);

app.listen(PORT,()=>{
    console.log(`Server started successfully at port ${PORT}.`);
})
