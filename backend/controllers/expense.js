const Expense = require('../model/expense');
async function handleaddexpense(req,res){
    const {title, price} = req.body;
    try{
        if(!title || !price){
            return res.status(406).json({message:"All fields are required"})
        }
        const expense = await Expense.create({
            title:title,
            price:price,
            createdby:req.user._id
        })
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}
async function handlegetexpense(req,res){
    try{
        const days = req.query.days;
        // const data = await Expense.find({});
        if(days==="all"){
            const data = await Expense.find({createdby:req.user._id});
            return res.status(200).json(data);
        }
        if(days==="0"){
            const date = new Date();
            date.setHours(0,0,0,0);
            const data = await Expense.find({createdAt:{$gte:date}});
            return res.status(200).json(data);
        }
        if(days==="7"){
            const date = new Date();
            date.setDate(date.getDate() - 7);
            const data = await Expense.find({createdAt:{$gte:date}});
            return res.status(200).json(data);
        }
        if(days==="30"){
            const date = new Date();
            date.setDate(date.getDate() - 30);
            const data = await Expense.find({createdAt:{$gte:date}});   
            return res.status(200).json(data);
        }
        const data = await Expense.find({});
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


async function handleEditexpense(req,res){
    const {id} = req.params;
    const {title, price} = req.body;
    try{
        const expense = await Expense.findByIdAndUpdate(id,{
            title:title,
            price:price
        },{new:true});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
async function handledeleteexpense(req,res){
    const {id} = req.params;
    try{
        await Expense.findByIdAndDelete(id);
        res.status(200).json({message:"Expense deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports={handleaddexpense,handlegetexpense,handleEditexpense,handledeleteexpense};