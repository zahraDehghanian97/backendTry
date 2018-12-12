let express = require('express');
//let mongodb = require('mongodb');
//let mongoclient = require('mongodb').MongoClient;
//let nodemailer = require('nodemailer');
//let CreateCollection = require('./models').CreateCollection;
//for creating collection
//let FindOne = require ('./models').FindOne;
// for finding some one in sign in (collectionName, user , response , page)
//let InsertOne = require('./models').InsertOne;
//for inserting a user (collectionName , user)
//let DeleteMany = require('./models').DeleteMany;
//for deleting all users (collectoinName)
let mongoose = require('mongoose');

let id ;

mongoose.connect('mongodb://Devaince:Loganlogan1@ds237815.mlab.com:37815/hospital');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let user = require('./models').user;

// let samin =  user({
//     universityCode : "sam",
//     password : "ans",
//     email : "alireza.kamgar@gmail.com",
//     confirmPassword : "56256"
// });

//samin.save(function(err)
// {
//     if (err) throw ("hgtfjytdtrshreayrharrhererehrestheshtrete");
//     console.log("salam samin joooooon!");
// });


console.log("khobi?");


page = {login : "/login",profile : "/profile", signup : "/signup", last : "/login" }
// web pages
 
let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })
//body parser

//let transpoter






let app = express();
//let http = require('http').Server(app)
//let port = process.env.port || 8080
//http.listen(port, () => console.log("listening on", port));
//app is made

//CreateCollection("users",ali);
//###

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine' , 'ejs');

app.get('/login',function(req , res ,next ){
    console.log('login o run kardam');
    res.render('login',page);
    });

app.use('/login',urlencodedParser,function(req , res, next){
    let loginUser = { 
        universityCode : req.body.universityCode,
        password : req.body.password
    };
    console.log(loginUser);
    user.find({universityCode : loginUser.universityCode ,password : loginUser.password }).exec(function(err ,docs){
        if(docs == "")
        {
            console.log("it is not found");
            res.redirect('login');
        }        
        else
        {
            id = docs[0]._id;
            res.writeHead(302, {
                'Location': '/profile'
                //add other headers here...
              });
            //res.render('profile',docs[0])
            res.end();
            
            console.log("it is found");
        }
    });

}); 

app.get('/signup', function(req , response){
    console.log("signup")
    response.render('signup',page);
    
});

app.use('/signup' , urlencodedParser , function(req , response){
    console.log("sign up")
    let newUser = user({ 
    universityCode : req.body.universityCode,
    email : req.body.email,
    password : req.body.password,
    confirmPassword : req.body.confirmPassword
    });
    console.log(user._id);
    console.log(newUser);
    if(newUser.password == newUser.confirmPassword)
    {
        console.log("asdasds");
        newUser.save(function(err)
        {
            if (err) throw("skdjbausdguyavsduvasdgv");
            console.log("u are added");
        });
        
        response.writeHead(302, {
        'Location': '/login'
        //add other headers here...
        });
        response.end();
    }
    else
    {
        console.log("sign up dobare");
        response.redirect('signup');
        //pass != confirm    
    }    
});




app.get('/profile' ,function(req , response){
    console.log("page : " + page.profile);
    // enter to profile
    console.log(id, ": haza id");
    user.find({_id : id}).exec(function(err, docs){
        console.log(docs[0]);
        response.render('profile',docs[0]);
    });
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

