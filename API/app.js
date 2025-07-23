const dbConnect=require('./connection')
const express = require("express");
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


  app.post('/loginform',async(req,resp)=>{
    let data =await dbConnect();
    data=db.collection('formdetails')   
    console.log(req.body);
    data= await data.insertOne(req.body)            //toArray  convert to structure form
    resp.send(data); 
  })

  app.get("/userdata", async(req, res) => {
    let data =await dbConnect();
    data=db.collection('formdetails')
    data= await data.find().toArray();
    res.send(data); 
  });

  app.get("/getdata/:id", async(req, res) => {
    var id = Number(req.params.id)
    let data =await dbConnect();
    data=db.collection('formdetails')
    data= await data.find({_id: id}).toArray();
    res.send(data); 
  });

 app.put("/updatedata/:id", async(req, res) => {
    var id = Number(req.params.id)
    let data =await dbConnect();
    data=db.collection('formdetails')
    data= await data.updateOne({_id: id}, {$set:req.body})
    console.log(req.body);
    console.log(data);
    res.send({result:"update"}) 
  });


  //http://localhost:8001/delRecord/59
  app.delete("/delRecord/:id", async(req, res) => {
    var id = Number(req.params.id)
    console.log(id);
    let data =await dbConnect();
    data=db.collection('formdetails')
    data= await data.deleteOne({_id:id})
    res.send(data); 
  });

  app.post('/login',async(req,resp)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    let data =await dbConnect();
    data=db.collection('formdetails')   
    console.log(req.body);
    data= await data.find({$and:[{email:email},{password:password}]}).toArray();            //toArray  convert to structure form
    resp.send(data);
  })


//   for Register page 

app.post('/registerform',async(req,resp)=>{
    let data =await dbConnect();
    data=db.collection('registerdetails')   
    console.log(req.body);
    const userId = Math.floor(Math.random() * 1000);
    const userData = { ...req.body, _id: userId };
    data= await data.insertOne(userData)            //toArray  convert to structure form
    resp.send(data); 
  })

  app.get("/userrecord", async(req, res) => {
    let data =await dbConnect();
    data=db.collection('registerdetails')
    data= await data.find().toArray();
    res.send(data); 
  });

  app.post('/register',async(req,resp)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    let data =await dbConnect();
    data=db.collection('registerdetails')   
    console.log(req.body);
    data= await data.find({email: email, password: password}).toArray();            //toArray  convert to structure form
    resp.send(data);
  })
app.listen(8001);


