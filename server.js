let express = require('express');
let mongodb = require('mongodb').MongoClient;
let CreateCollection = require('./models').CreateCollection;
let FindOne = require ('./models').FindOne;
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
//let controllers = require('./controllers');
let app = express();
app.set('view engine' , 'ejs');
console.log('start server');
app.use('/assets', express.static(__dirname + '/public'));
app.use('/',function(req , res ,next ){
    console.log('first page is running' + req.url);
    next();
});
app.get('/' , function(req , res){
    res.render('index');

});
app.post('/check',urlencodedParser ,function(req , response){
    var user = { 
            username : req.body.username,
            password : req.body.password};
        
      FindOne('user',user,response);
    });

app.listen(8000, function(){
    console.log("server is runing :) ");
});

