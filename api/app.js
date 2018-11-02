'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer')
var path = require('path');

//rutas
var api_routes = require('./Modules/routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json(true));


//configurar cabeceras http
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT , DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
	next();
});


//rutas base
 
app.use('/api',api_routes);
 




module.exports=app;