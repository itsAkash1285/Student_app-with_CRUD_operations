const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	user_id:{
      type:mongoose.Schema.Types.ObjectId,
	  require:true,
	  ref:"User"
	},
	name:{
		type:String,
		require:[true, 'plzz add the student name' ]
	},
	email:{
		type:String,
		require:[true, 'plzz add the student email address' ]
	},
	phone:{
		type:String,
		require:[true, 'plzz add the student phone number' ]
	},},
	{
		timestamps : true
	});

module.exports = mongoose.model("Student",studentSchema)