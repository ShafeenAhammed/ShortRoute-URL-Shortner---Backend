const jwt = require('jsonwebtoken');

const urlCollection = require("../models/urlSchema");
const userCollection = require("../models/userSchema");

module.exports = {
    register : async (req,res)=>{
        try{
            const {email}=req.body;
            const check= await userCollection.findOne({email:email});
            if(check){
                res.json({message:"Email already exists",email:email,exist:true});
        }else{
            await userCollection.insertMany([req.body]);
            res.json({success: true, email:email, exist:false});
        }   
        }
        catch(err) {
            console.error("Error in registering user",err);
            res.json({success: false})
        }
    },

    login: async (req,res)=>{
        try{
            console.log(req.body.email);
            const check = await userCollection.findOne({ email: req.body.email })
            console.log(check);
            if(!check){
                res.json({message:"Invalid email",authentication:false})
            }else{
                if (check.password === req.body.password) {
                    const token = jwt.sign({ email:check.email, name:check.name}, process.env.TOKENSECRETKEY, {expiresIn:"2h"});
                    res.json({message:"Login Success",authentication:true, token:token,user:check});
                } else {
                    res.json({message:"Invalid Password",authentication:false});
                }
            }
        }
        catch(err){
            console.error("Error in customer login",err);
            res.status(500).json({message:`Error::->${err}`,authentication:false});
        }
    }
}