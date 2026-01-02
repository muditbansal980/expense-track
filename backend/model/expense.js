const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
    ,
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})

const Expense = mongoose.model("Expense",schema);
 
module.exports = Expense;