let mongoose = require('mongoose');
let mongodb = require('mongodb');
let userSchema = mongoose.Schema({
    username: String,
    lastname: String
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.CreateCollection= function (CollectionName)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
    if (err) throw err;
    console.log("connect to database");
    var dbo = db.db("hospital");
    dbo.createCollection(CollectionName , function(err , res ){
    if (err) throw err;
    console.log('creat collection'+CollectionName);
    //test object :
    // dbo.collection('user').insertOne({username : 'zahrajan' , password: "1376"},function(err,res){
    //     if(err) throw err ;
    //     console.log('zahra is added');
    // })
    db.close();
    });
});
}
module.exports.FindOne= function (CollectionName,User,response)
{
    mongodb.connect('mongodb://localhost:27017/',function(err, db){
        if (err) throw err;
        console.log("connect to database");
        var dbo = db.db("hospital");
            dbo.collection(CollectionName).findOne({username: User.username}, function(err ,result){
                if(result == null){
                    console.log(User.username + 'is not sign up before');
                    response.render('check',{login : 0 ,signup : 0 });
                }
                else{       

                    console.log("username was found ");
                    if(User.username == result.username && User.password == result.password){
                        //dbo.collection("user").insertOne(user,function(err , res){
                            console.log("user is accepted")
                            if (err) throw err;
                            response.render('check',{signup : 0 ,login : 1 ,username : User.username , password : User.password});
                        //});
                    }
                    else{ 
                        console.log('password is incorrect');   
                       // console.log("user pasword is "+ User.password+ "correct password is "+result.password);
                        response.render('check',{signup : 0 ,login : 0});
                    }
                }    
            });
        db.close();
    });
}  
module.exports.InsertOne= function (CollectionName,User,response)
{
mongodb.connect('mongodb://localhost:27017/',function(err, db){
    if (err) throw err;
    var dbo = db.db("hospital");
    dbo.collection(CollectionName).insertOne(User,function(err , res){
        if (err) throw response.render('check',{signup : 0,login : 0})
        else {
            console.log('username : '+User.username+' \n password : '+User.password)
            response.render('check', {login : 0 , signup : 1});
        }
    });
    db.close();
});
}

   