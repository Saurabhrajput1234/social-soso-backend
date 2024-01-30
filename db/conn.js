const mongoose = require("mongoose");
const DB = "mongodb+srv://saurabhrajput30072002:hQ3D5bHX8YZ8TUFL@studentdata.kv8ukp1.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB,{useUnifiedTopology:true,
useNewUrlParser:true}).then(()=>console.log("database connected")).catch((error)=>{console.log(error);})
// mongoose.connect("mongodb+srv://saurabhrajput30072002:hQ3D5bHX8YZ8TUFL@studentdata.kv8ukp1.mongodb.net/?retryWrites=true&w=majority").then(()=>{
//   console.log("connection successfull")
// }).catch((e)=>{console.log(e+"not connected")});





