const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc register a user
//@desc GET Api/users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
     res.status(400);
    throw new Error("All Fields Are Mandatory");
   }
 const userAvailable = await User.findOne({email});
 if(userAvailable){
	  res.status(400);
    throw new Error("User already registered!");
 }

 //hash Password
 const hashedPassword = await bcrypt.hash(password, 10);
 console.log("HashedPassword:", hashedPassword);

 const user = await User.create({
	username,
	email,
	password:hashedPassword
 });
 console.log(`user created ${user}`);
 if(user){
	res.status(201).json({_id:user.id, email:user.email})
 }else {
	 res.status(400);
	 throw new Error("user data is not valid");
 }
});

//@desc login a user
//@desc POST Api/users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error ("All Fields are Mandatory");
  };
  const user = await User.findOne({email});
  //compare password with hashedpassword
  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user:{
        username:user.username,
        email:user.email,
        id:user.id
      },
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"}
    );
   return res.status(200).json({accessToken});
  }else{
    res.status(401);
    throw new Error ("email or password are not valid");
  }
});

//@desc current user info
//@desc GET Api/users/current
//access private

const currentUser = asyncHandler(async (req, res) => {
  //console.log({"message":"user is connected"});
   res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
