const express = require("express");
const app = express();
require("./db/conn");
const router = require('./routes/router');
const cors = require("cors");
const cookiparser = require("cookie-parser")
const port= 3004;


// app.get("/",(req,res)=>{
//   res.status(201).json("server is created")
// })
app.use(express.json());
app.use(cors());
app.use(cookiparser());
app.use(router);

app.listen(port,()=>{
  console.log(`server start at port no :${port}`)
})