const express=require("express");
const app=express();
require("dotenv").config();
const dbconnect=require("./config/database");
const cookieParser=require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://techtrendz.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);


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

const newsRoute=require("./routes/newsRoute")
app.use("/api",newsRoute)

const commentRoute=require("./routes/commentRoute")
app.use("/api/comment",commentRoute)

app.listen(PORT,()=>{
    console.log(`Server started successfully at port ${PORT}.`);
})
