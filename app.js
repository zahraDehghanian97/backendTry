var express = require ('express');
var app = express();
var mongoose = require('mongoose');
//var url = "mongodb://zahraDehghanian97:1qaz!QAZ@ds155352.mlab.com:55352/hospital";
var url = 'mongodb://127.0.0.1/my_database';
mongoose.connect(url, function(err, db) {
  console.log("Database created!");
  
});
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//var port =   process.env.port||  3020 ;
app.get('/helloZ/:usr/:pass',function(req,res){
    res.send("<html><head></head><body>here is "+req.params.usr+"with password "+req.params.pass+"</body></html>");
});
app.get('/hello',function(req,res){
    res.send("<html><head></head><body>hello from me to </body></html>");
});
app.listen(3000);