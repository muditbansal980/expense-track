const express = require("express")
const router = express.Router()

const {handlesignup,handlelogin} = require("../controllers/user")
router.post("/signup",handlesignup)
router.post("/login",handlelogin)
module.exports = router