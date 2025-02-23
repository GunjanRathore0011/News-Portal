const express=require("express");
const app=express();
require("dotenv").config();
const dbconnect=require("./config/database");
const cookieParser=require("cookie-parser");

// port number
const PORT=process.env.PORT;
// connect with database;
dbconnect();

// add middlewares
app.use(express.json());
app.use(cookieParser());
 
// mouting routes 
const authRoute=require("./routes/authRoute");
app.use("/api/v1",authRoute);

const userRoute=require("./routes/userRoute")
app.use("/api/user",userRoute);


const postRoute=require("./routes/postRoute")
app.use("/api/post",postRoute)


app.listen(PORT,()=>{
    console.log(`Server started successfully at port ${PORT}.`);
})
