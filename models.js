let mongodb = require('mongodb')
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    universityCode : String,
    email : String,
    password : String,
    confirmPassword : String,
    

});
let hospitalSchema = new Schema({
    name : String
    ,
    type : {
        typeName: String ,
        enum :['governmental' ,'private' ]
    },
    // profession : {
    //     typeName : String ,
    //     enum :['general', 'obstetrics and gynecology' ,  ]
    // },
    doctors : Array
    
});

let employee = new Schema({
    name : String ,
    salary : Number ,
    startDate : Date ,
    // level : {
    //     typeName : string ,
    //     enum : ['intern' , 'doctor on call', 'general' , 'specialist', 'resident', 'medical student']
    // },

    hospitals : Array,
    sections : Array,
    type :{
        typeName : String,
        enum :['security','doctor','nurse','servant']
    },
    profession :String,
    qualityLevel : {
        typeName : String,
        enum :['A','B','C','D']
    }

});
let section = new Schema ({
    name : {
        typename : String,
        enum :['ENT','urgent','morgue','orthopedic','general'] //shima 
    },
    floor : Number
})
module.exports.user = mongoose.model('user', userSchema);
 













//using mongodb for data base 
//let nodemailer = require('nodemailer');
// module.exports.CreateCollection= function (collectionName)
// {
//     mongodb.connect('mongodb://localhost:27017/',function(err, db){
//     if (err) throw err;
//     console.log("you are now connected to your database");
//     var dbo = db.db("hospital");
//     dbo.createCollection(collectionName , function(err , res ){
//     if (err) throw err;
//     console.log('creat collection');
//     dbo.collection(collectionName).insertOne({universityCode : 'zahrajan' , password: "1376" , unicode:"610395136"},function(err,res){
//         if(err) throw err ;
//         console.log('zahrajan is added pass : 1376');
//     })
//     db.close();
// });
// });
// }
//creating a collection in db



module.exports.CreateCollection= function (collectionName,dbo)
{
    dbo.createCollection(collectionName , function(err , res ){
    if (err) throw err;
    console.log('creat collection');
    dbo.collection(collectionName).insertOne({universityCode : 'zahrajan' , password: "1376" , unicode:"610395136"},function(err,res){
        if(err) throw err ;
        console.log('zahrajan is added pass : 1376');
    });

});
}



module.exports.FindOne= function (collectionName , user, response , page)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
        if (err) throw err;
        var dbo = db.db("hospital");
            dbo.collection(collectionName).findOne({universityCode: user.universityCode}, function(err ,result){
                //if exist
                if(result == null){
                    console.log(user.universityCode + " was not found!");
                    page.last = "/login"
                    response.render('login',page);
                }
                //if not 
                else{       
                    if(user.universityCode == result.universityCode && user.password == result.password){
                        //dbo.collection("user").insertOne(user,function(err , res){
                            console.log("user has been added!")
                            if (err) throw err;
                            page.last = "/profile"
                            response.render('profile',user);
                        //});
                    }
                    else{    
                        page.last = "/login";
                        console.log(page);
                        response.render('login',page);
                    }
                }    
            });
        db.close();
    });
}                  

//find some one in db 
// if it was in it so render profile
//else it was render login

module.exports.DeleteMany = function (collectionName)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
    if (err) throw err;
    console.log("you are now connected to your database");
    var dbo = db.db("hospital");
    dbo.collection(collectionName).deleteMany( {}, function(err , res ){
    if (err) throw err;
    console.log("all users are deleted !");
})
    db.close();
});
}
//delete all users in db

module.exports.InsertOne = function (collectionName,user)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
    if (err) throw err;
    console.log("you are now connected to your database");
    var dbo = db.db("hospital");
    dbo.collection(collectionName).insertOne( user , function(err , res ){
    if (err) throw err;
    console.log(user.universityCode + " is added !");
});
    db.close();
});
}





//add a user to db
module.exports.UpdateOne = function (collectionName,pastQuery,newQuery)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
    if (err) throw err;
    console.log("you are now connected to your database");
    var dbo = db.db("hospital");
    dbo.collection(collectionName).updateOne(pastQuery , {$set : newQuery}, function(err , res ){
    if (err) throw err;
    console.log(collectionName + " is updated !");
});
    db.close();
});
}


///
/*
module.exports.C reateTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/