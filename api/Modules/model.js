'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
	name: String,
	surname: String,
	username: String,
	password: String,
	role: String
})

var PackageSchema = Schema({
    title: String,
    resume: String,
    precio: String,
    portada: String,
})

var PackageImageSchema = Schema({
    url: String,
    package: {type: Schema.ObjectId, ref:'Package'}
})


var UserModel = mongoose.model('User', UserSchema );
var PackageModel = mongoose.model('Package',PackageSchema);
var PackageImageModel = mongoose.model('PackageImage',PackageImageSchema);

module.exports = {
    UserModel,
    PackageModel,
    PackageImageModel
}