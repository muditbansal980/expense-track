const User = require("../model/user")
const { setUser } = require("../services/auth")
async function handlesignup(req, res) {

    try {
        const { username, password, email } = req.body
        const data = await User.findOne({ username, email })
        const body = await User.find()
        if (data) {
            return res.status(409).send("User Already Exists")
        }
        if (body.some((data) => data.username === username || data.email === email)) {
            return res.status(409).send("User Already Exists")
        }
        await User.create({
            username: username,
            password: password,
            email: email
        })
        return res.status(200).json({ message: "Added Data" })
    }
    catch (err) {
        console.log("ERROR IN HANDLESIGNUP")
        return res.json({ Error: "Error in posting user data" })
    }
}



async function handlelogin(req, res) {

    try {
        const { username, password } = req.body
        const data = await User.findOne({ username })
        if (!data) {
            return res.status(404).send("No such user")
        }
        if (!data.password || data.password !== password) {
            return res.status(404).send("No such user")
        }
        const token = setUser(data)
            res.cookie("UID", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            return res.status(200).send("Login Successful")
        }
    catch (err) {
            return res.send("Error in login")
        }
    }

module.exports = { handlesignup, handlelogin }