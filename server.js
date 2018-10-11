let express = require('express');
let mongodb = require('mongodb').MongoClient;
//let nodemailer = require('nodemailer');
let CreateCollection = require('./models').CreateCollection;
//for creating collection
let login = require ('./models').login;
// for finding some one in sign in (collectionName, user , response , page)
let InsertOne = require('./models').InsertOne;
//for inserting a user (collectionName , user)
let DeleteMany = require('./models').DeleteMany;
//for deleting all users (collectoinName)
page = {login : "/login",profile : "/profile", signup : "/signup", last : "/login" }
// web pages
 
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
//body parser

//let transpoter
var x;
mongodb.connect('mongodb://localhost:27017/',function(err, db){
        if (err) throw err;
        console.log(db);
    });
    console.log(x);
    var dbo = x.db("hospital");
    dbo.createCollection(collectionName , function(err , res ){
    if (err) throw err;
    console.log('creat collection');
    dbo.collection(collectionName).insertOne({universityCode : 'zahrajan' , password: "1376" , unicode:"610395136"},function(err,res){
        if(err) throw err ;
        console.log('zahrajan is added pass : 1376');
    });
});
  
let app = express();
//app is made

//###
//CreateCollection("users");
//###



app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine' , 'ejs');

app.get('/login' , function(req , res){
    console.log('login o run kardam');
    res.render('login',page);
});
app.use('/login',urlencodedParser,function (req,res){
    console.log("page : " + page.profile);
    // enter to profile
    let user = { 
        universityCode : req.body.universityCode,
        password : req.body.password
        
    };
    console.log(user);
    let returnable = login("users" , user , res , page);
    console.log(returnable.pageName +"this is page name");
    returnable.pageName == 'login'? res.redirect('login') : res.render(returnable.pageName,page);



});
app.post('/login',function(req , res ,next ){
    //console.log('/login o run kardam' + req.url);
        next();
        res.redirect("login");
    });
// app.get('/person/:id' , function(req , res){
//     res.render('person' ,{aydi : req.params.id , Qiustr: req.query.qstr });
// }); 

app.post(page.profile ,urlencodedParser, function(req , response){
    

});

app.use(page.signup , function(req , response, next){
    response.render('signup',page);
    next();
});
app.use(page.login , urlencodedParser , function(req , response){
    let user = { 
    universityCode : req.body.universityCode,
    phoneNumber : req.body.phoneNumber,
    password : req.body.password,
    confirmPassword : req.body.confirmPassword
    };
    if(user.password == user.confirmPassword)
    {
        InsertOne("users" , user);
        console.log("insert kardam");
        response.render('login',page);
    }
    else
    {
        response.render('signup',page);
        
    }    
});
//app.use(page.mail , function(req , response , next){
//});

// app.use(page.signup, urlencodedParser, function(req , response){
//     console.log("page : " + page.signup);
//     //enter sign up page
//     let user = { 
//         username : req.body.username,
//         password : req.body.password
//     };
//     InsertOne("users" , user);
//     response.render('login');
// });

// app.use(function(req, res , next){
//     let err = new Error("404 not found");
//     err.status = 404
// });
// app.use(function(err, req, res, next){
//     res.status(err.status).send(err.message)
// });

app.listen(8000, function(){
    console.log("server is runing :) ");
});

