var mongoose = require('mongoose');
var app = require('./app');
const config = require('./config')



mongoose.connect(config.db,{useNewUrlParser: true },(err,res) =>{
	if(err){
		// throw  err;
	}else{
        
		console.log("La base de datos esta corriendo");
		app.listen(config.port,function(){
			console.log("Servidor Corriendo");
		});
	}


});