let mongodb = require('mongodb')
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    universityCode : String,
    email : String,
    password : String,
    confirmPassword : String,
    authenticateId : String
});
module.exports.user = mongoose.model('user', userSchema);
let nodemailer = require('nodemailer');
///

module.exports.CreateTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth:
  {
      user: 'nizomaan@gmail.com',
      pass: 'nizomanadmin'
  }
});
