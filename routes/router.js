 const express = require("express");
 const router = new express.Router();
 const userdb = require("../models/userSchema");
 const authenticate = require("../middleware/authenticate");
 const bcrypt = require("bcryptjs");


 

 //for user  registration 

 router.post("/register",async(req,res)=>{
  const {name,email,password,cPassword}= req.body;

  if(!name || !email || !password || !cPassword)
  {res.status(422).json({error:"fill all details"})}

  try {
    const preuser = await userdb.findOne({email:email});
    if(preuser){
      res.status(422).json({error:"This email is already exist"})
    }
    else if (password !== cPassword){
      res.status(422).json({error:"password and cpasswprd is not match"})
    }
    else{
      const finalUser = new userdb({
        name,email,password,cPassword 
      });
      //here password hashing
      const storeData = await finalUser.save();
      console.log(storeData);

    }
  }
  catch(error){
    res.status(422).json(error);
    console.log( error+"catch block error")
  }

 });


 //user Login
 router.post("/login",async(req,res)=>{
  console.log(req.body);
  const{ email,password}= req.body;
  if(!email || !password){
    res.status(422).json({error:"fill all the datails"})
  }
   try {
    const userValid = await userdb.findOne({email:email})
     if (userValid){
      const isMatch = await bcrypt.compare(password,userValid.password);
      if(!isMatch){
        res.status(422).json({error:"invalid details"})

      }
      else{
        // token generate
        const token = await userValid.generateAuthtoken();
        

        // cookiegenerate
        res.cookie("usercookie",token,{
          expires:new Date(Date.now()+9000000),
          httpOnly:true
        });
        const result = {
          userValid,
          token
        }
        res.status(201).json({status:201,result})
      }
     }
   } catch (error) {
    res.status(422).json(error)
    
   }
 });

 // user valid
 router.get("/validuser",authenticate,async(req,res)=>{
 try{
  const validUserOne = await userdb.findOne({_id:req.userId});
  res.status(201).json({status:201,validUserOne});
 } catch (error){
  res.status(401).json({status:401,error});

 }

 })

 module.exports = router;
