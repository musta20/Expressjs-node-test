'use strict';
const mongoose = require('./Db').mongoose;
const Joi = require('joi');

var schema =  mongoose.Schema({
    name:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true}
});
const JoiScheam =  Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),   
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .required()});
const UserModel = mongoose.model('users',schema);

exports.UserModel = UserModel;
exports.JoiScheam = JoiScheam;
