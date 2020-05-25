const PostRout = require('express').Router();
const PostModel = require('../models/PostModel').PostModel;
const JoiScheam = require('../models/PostModel').JoiScheam;
var bodyParser = require('body-parser');

PostRout.use(bodyParser.json())
PostRout.use(bodyParser.urlencoded({extended:false}));

PostRout.get('/post',function(req,res){
     PostModel.find({},function(err, docs){
         console.log(docs);
        return res.status(200).send({"data":docs});

    });

});

PostRout.get('/post/:id',function(req,res){
    PostModel.findById(req.params.id,function(err, docs){
        console.log(docs);
       return res.status(200).send({"data":docs});

   });

});

PostRout.post('/post',async function(req,res){

try {  
    await JoiScheam.validateAsync(req.body);

     await new PostModel(req.body).save();
     res.status(200).send({"data":"data inserted"});
} 
catch (e){
    res.status(200).send({"data":e.message});

}
})

PostRout.delete('/post/:id',async function(req,res){
    try {  

         await PostModel.findByIdAndRemove(req.params.id);
         res.status(200).send({"data":"deleted"});
    } 
    catch (e){
        res.status(200).send({"the erorr":e.message});
    
    }
})

PostRout.put('/post/:id',async function(req,res){
    try {  
        await JoiScheam.validateAsync(req.body);
    
         await PostModel.findByIdAndUpdate(req.params.id,req.body);
         res.status(200).send({"data":"data updated"});
    } 
    catch (e){
        res.status(200).send({"data":e.message});
    
    }
})


exports.PostRout = PostRout;