const express = require("express")
const router = express.Router()
const {handleaddexpense,handlegetexpense,handleEditexpense,handledeleteexpense} = require("../controllers/expense")

router.post("/addexpense",handleaddexpense)
router.get("/addexpense",handlegetexpense)
router.patch("/editexpense/:id",handleEditexpense)
router.delete("/deleteexpense/:id",handledeleteexpense)
module.exports=router