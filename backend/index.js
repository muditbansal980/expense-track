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
    origin: 'http://localhost:5175', 
    credentials: true,               
  })
);
app.use(express.json())
app.use(cookieParser())

// <------------------connection db----------------------->
connectiondb("mongodb://127.0.0.1:27017/expense-tracker")
app.use("/crud",authmiddleware,crudroute)
app.use("/user",userroute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});