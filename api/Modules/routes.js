
'use strict'

var express = require('express');
var controller = require('./controller');
var md_auth = require('./authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload'});

api.get('/test',controller.pruebas);
api.post('/user/register',controller.saveUser);
api.post('/user/login',controller.loginUser);
api.put('/user/update/:id',md_auth.ensureAuth,controller.updateUser);

api.post('/package/create',md_auth.ensureAuth,controller.PackageNew);
api.get('/package/get',controller.PackageGets);
api.get('/package/get/:id',controller.PackageGet);
api.put('/package/update/:id',md_auth.ensureAuth,controller.PackageUpdate);


api.post('/package/image/:id',md_auth.ensureAuth,controller.PackageImageNew);
api.get('/package/image/:id',md_auth.ensureAuth,controller.PackageImageGet);
module.exports=api;