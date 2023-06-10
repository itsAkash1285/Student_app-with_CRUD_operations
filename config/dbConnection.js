const mongoose = require('mongoose');

const connectDb = async()=>{
	try{
  const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  
  console.log('database connected:',
  connect.connection.host,
  connect.connection.name
  );	
	}catch(err){
      console.log(err);
	    process.exit(1);
	}
  
};

module.exports= connectDb;

// const mongoose = require('mongoose');

// const connectDb = async()=>{
// 	const connect = await mongoose.connect(process.env.MONGODB_URI || 
//     'mongodb://localhost/posts');
//     var db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function() {
//       console.log('DB connected!');
//     });
// };

// module.exports= connectDb;