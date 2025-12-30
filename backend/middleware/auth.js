const {getUser} = require("../services/auth")
function authmiddleware(req,res,next){
    const Cookieid = req.cookies?.UID
    console.log("UID:-",Cookieid)
    if (!Cookieid){
        return res.status(406).send("User has not login")
    }
    const user = getUser(Cookieid)
    if(!user){
        return res.status(400).send("Bad Request")
    }
    next()
}

module.exports = {authmiddleware}