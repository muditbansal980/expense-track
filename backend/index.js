require ("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const crudroute = require("./routes/crudroute")
const userroute = require("./routes/user")
const {connectiondb} = require("./connection")
const {authmiddleware} = require("./middleware/auth")
const cookieParser = require('cookie-parser');
const PORT = 3008;
app.use(
  cors({
    origin: ['http://localhost:5175',"https://expense-track-o6f6.vercel.app"],
    credentials: true,               
  })
);
app.use(express.json())
app.use(cookieParser())

// <------------------connection db----------------------->
connectiondb(process.env.MONGO_URL)
app.use("/crud",authmiddleware,crudroute)
app.use("/user",userroute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});