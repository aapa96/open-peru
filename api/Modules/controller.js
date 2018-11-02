'use strict'
var bcrypt = require('bcrypt-nodejs');
var model = require('./model');
var jwt = require('./jwt');
var path = require('path');
var fs = require('fs');
var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'aapa96', 
    api_key: '562729779479151', 
    api_secret: 'uok7umnAwV9Wt7RHgRhsymbUNl0' 
  });


function pruebas(req,res){
	res.status(200).send({
		message:"Controlador de prueba"
	});
}


/* Controller user */

function saveUser(req,res){
	var user = model.UserModel();
	var params = req.body;
	user.name = params.name;
	user.surname = params.surname;
	user.username = params.username;
	user.role = 'ROLE_USER';

 	if(params.password){
		//encriptar contrase;a
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if (user.name != null && user.surname != null && user.username != null) {
				// Guardar Usuario
				user.save((err,userStored)=>{
					if (err) {
						// statement
						res.status(500).send({message:"Error al guardar usuario"});
					} else {
						// statement
						if (!userStored) {
							res.status(404).send({message:"No se ha registrado el usuario"});
						} else {
							res.status(200).send({user: userStored});
						}
					}
				});
			} else {
				res.status(200).send({message:"Introduce todos los campos"});
			}
		});
	}else{
		res.status(200).send({message:"Introduce la contrasena"});
	}
}

function loginUser(req,res){
	var params = req.body;
	var username = params.username;
	var password = params.password;

	model.UserModel.findOne({username:username.toLowerCase()},(err,user) =>{
		if (err) {
			// statement
			res.status(500).send({message:"Error en la peticion"});
		} else {
			// statement
			if (!user) {
				// statement
				res.status(404).send({message:"El usuario no existe"});
			} else {
				// Comprobar contrasea
				bcrypt.compare(password,user.password,function(err,check){
					if(check){
						//devolve datos de usuario logueado
						if(params.gethash){
							//devolver token con datos de usuario gracias a jwt
							res.status(200).send({
								token:jwt.createToken(user)
								
							});
						}else{
                            res.status(200).send({
                            token:jwt.createToken(user),
                            id:user._id,
                            name:user.name,
                            surname:user.surname,
                            username:user.username
                            
                        });
						}
					}else{
						res.status(404).send({message:"Usuario no ha podido loguearse"});
					}
				});
			}
		}
	});
}

function updateUser (req,res) {
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId,update,(err,userUpdated) =>{
		if (err) {
			res.status(500).send({message:"Error al actualizar usuario"});
		} else { 
			if (!userUpdated) {
				res.status(404).send({message:"No se ha podido actualizar el usuario"});
			} else {
				res.status(200).send({user:userUpdated});
			}
		}
	});
}


/* Controller Package*/

function PackageNew(req,res){
    var Package = model.PackageModel();
    var params = req.body;
    Package.title = params.title;
	Package.resume = params.resume;
    Package.precio = params.precio;
    Package.portada = params.portada;
	Package.save((err,packageStored)=>{
        if (err) {
            // statement
            res.status(500).send({message:"Error al guardar paquete"});
        } else {
            // statement
            if (!packageStored) {
                res.status(404).send({message:"No se ha registrado el paquete"});
            } else {
                res.status(200).send({package: packageStored});
            }
        }
    });
}
function PackageGets(req,res){
    model.PackageModel.find((err,packages) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!packages){
				res.status(404).send({message:'No hay establecimientos'});
			}else{
				return res.status(200).send(
					packages
				);
			}
		}
	});
}
function PackageGet(req,res){
	var packageId = req.params.id;
	model.PackageModel.findById(packageId,(err,data) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!data){
				res.status(404).send({message:'El establecimiento no existe'});
			}else{
				res.status(200).send({package:data});
			}
		}
	});
}
function PackageUpdate (req,res) {
	var packageId = req.params.id;
	var update = req.body;
	model.PackageModel.findByIdAndUpdate(packageId,update,(err,packageUpdated) =>{
		if (err) {
			res.status(500).send({message:"Error al actualizar paquete"});
		} else { 
			if (!packageUpdated) {
				res.status(404).send({message:"No se ha podido actualizar el paquete"});
			} else {
				res.status(200).send({user:packageUpdated});
			}
		}
	});
}

/** Create image package */
function PackageImageNew(req,res){
    var packageId = req.params.id;
    var item = model.PackageImageModel();
    item.package = packageId;
    item.url = req.body.url;
    item.save((err,packageStored)=>{
        res.status(200).send(packageStored);
    })
}

function PackageImageGet(req,res){
	var packageId = req.params.id;
	model.PackageImageModel.find({package:packageId},(err,data) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!data){
				res.status(404).send({message:'El establecimiento no existe'});
			}else{
				res.status(200).send({package:data});
			}
		}
	});
}
 
module.exports = {

    //user
	pruebas,
	saveUser,
	loginUser,
    updateUser,
    
    PackageNew,
    PackageGets,
    PackageGet,
    PackageUpdate,


    PackageImageNew,
    PackageImageGet

};