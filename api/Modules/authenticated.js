'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave secreta';

exports.ensureAuth = function(req,res,next){
	if (!req.headers.authorization){
		return res.status(403).send({message:"La peticion no tiene la cabecera de autenticacion"});
	}

	var token = req.headers.authorization.replace(/['"]+/g,'');

	try {
		var payload = jwt.encode(token,secret);

		if (payload.exp <= moment().unix()) {
			// statement
			return res.status(401).send({message:"Token expirado"});
		} 
	} catch(ex) {
		// statements
		return res.status(403).send({message:"Token no valido"});
	}
	req.user = payload;
	next();
};