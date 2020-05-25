'use strict';

const UserRout = require('express').Router();
const UserModel = require('../models/UserModel').UserModel;
const JoiScheam = require('../models/UserModel').JoiScheam;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const fs = require('fs');
var path = require('path');


UserRout.use(bodyParser.json())
UserRout.use(bodyParser.urlencoded({extended:false}));

UserRout.get('/user',function(req,res){
     UserModel.find({},function(err, docs){
         console.log(docs);
        return res.status(200).send({"data":docs});

    });

});

UserRout.get('/user/:id',function(req,res){
    UserModel.findById(req.params.id,function(err, docs){
        console.log(docs);
       return res.status(200).send({"data":docs});

   });

});

UserRout.post('/verify',function(req,res){
    var publicKEY  = fs.readFileSync('./public.pem', 'utf8');

     jwt.verify(req.body.token, publicKEY, function(err, decoded) {
        console.log(decoded._id) // bar
        return res.status(200).send({"data":decoded._id});

      });
    


});

UserRout.post('/Register',async function(req,res){

try {  
    await JoiScheam.validateAsync(req.body);

     await new UserModel(req.body).save();
     res.status(200).send({"data":"data inserted"});
} 
catch (e){
    res.status(200).send({"data":e.message});

}
})

UserRout.post('/login',async function(req,res){

    try {  
        
    
        UserModel.findOne({email:req.body.email},function(err, docs){
            var privateKEY  = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign({ _id: docs._id }, privateKEY, { algorithm: 'RS256'});
           return res.status(200).send({"data":token});
    
       });         
    } 
    catch (e){
        res.status(200).send({"data":e.message});
    
    }
   

    })

UserRout.delete('/user/:id',async function(req,res){
    try {  

         await UserModel.findByIdAndRemove(req.params.id);
         res.status(200).send({"data":"deleted"});
    } 
    catch (e){
        res.status(200).send({"the erorr":e.message});
    
    }
})

UserRout.put('/user/:id',async function(req,res){
    try {  
        await JoiScheam.validateAsync(req.body);
    
         await UserModel.findByIdAndUpdate(req.params.id,req.body);
         res.status(200).send({"data":"data updated"});
    } 
    catch (e){
        res.status(200).send({"data":e.message});
    
    }
})


exports.UserRout = UserRout;