const mongoose = require("mongoose")

async function connectiondb(url){
    return (mongoose.connect(url).then(()=>{console.log("MONGO CONNECTED SUCCESSFULLY")}).catch((err)=>{console.log("Connection with db failed",err)}))
}

module.exports ={connectiondb}
