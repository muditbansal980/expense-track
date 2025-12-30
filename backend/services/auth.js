const jwt = require("jsonwebtoken")
const secreatkey = "expensetracker@#8800^1.0.0"
function setUser(user) {
     return jwt.sign({
        _id: user._id,
        username: user.username
    }, secreatkey)
    
}
function getUser(token) {
    if (!token) return null;
    try {
        // <-------------------------return the decoded payload-------------------------->
        return jwt.verify(token, secreatkey);
    }
    catch (err) {
        console.error("JWT verification error:", err);
        return null;
    }
}

module.exports={setUser,getUser}