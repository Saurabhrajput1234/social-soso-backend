const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "mynameissaurabhrajputifyouhaveanytyuplkbhkhbkbkjbkknkjjkbjk"

const userSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid Email");
      }
    },
  },

  password: { type: String, required: true, minilength: 6 },

  cPassword: { type: String, required: true, minilength: 6 },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});



// hash password

userSchema.pre("save",async function(next){

  if(this.isModified("password")){
  this.password = await bcrypt.hash(this.password,12);
  this.cPassword = await bcrypt.hash(this.cPassword,12);}

  next()
})
//token generate
userSchema.methods.generateAuthtoken = async function(){
  try{
    let token = jwt.sign({_id:this._id},keysecret,{expiresIn:"1d"});
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch(error){
    res.status(422).json(error)
  }
}

const userdb = mongoose.model("userdbs", userSchema);
module.exports = userdb;
