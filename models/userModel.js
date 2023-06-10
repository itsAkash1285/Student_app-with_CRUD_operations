const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
	username:{
		type:String,
		required:[true, "plzz enter the user name"]
	},
	email:{
		type:String,
		required:[true, "plzzz enter the user email"],
		unique :[true, "email address already taken"]
	},
	password:{
		type:String,
		required:[true, "plzz enter the password"]	
	},
 },{
	timestamp : true
 });

 module.exports = mongoose.model("User", userSchema);