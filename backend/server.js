require("dotenv").config()
const express = require('express');
const cors = require('cors');
const path = require("path");
const connectDB=require("./config/db");
const authRoutes = require('./routes/authRoutes');
const incomeRoutes=require('./routes/incomeRoutes');
const expenseRoutes=require('./routes/expenseRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes')

const app = express();

//Middleware to handle CORS 
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

//serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


const PORT = process.env.PORT || 5000

const start = async () => {
    try { 
      await connectDB(process.env.MONGO_URI); 
      console.log('MongoDb connected successfully')
      app.listen(PORT,console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    } 
  };
  
  start();

  await connectDB(process.env.MONGO_URI);
  if(process.env.NODE_ENV !== "production"){
      start();
  }

  export default server;