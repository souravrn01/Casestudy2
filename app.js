// Task1: initiate app and run server at 3000

const express = require('express')
const app = express()
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json()) 
app.use(express.urlencoded({extended:true})) 
const EmployeeData = require('./model/employee.js')

// Task2: create mongoDB connection 

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://souravrn:Mongo321atlas@cluster0.z8fhr4f.mongodb.net/casestudy2?retryWrites=true&w=majority") 
  .then(() => {
    console.log("mongo success");
  })
  .catch((error) => {
    console.log("connection error" + error);
  });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req, res)=>{
  EmployeeData.find().then(function(data){
    res.send(data);
  })
})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req,res)=>{
  EmployeeData.findOne({"_id": req.params.id }).then(function(data){
    res.send(data)
  })
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res)=>{
    try{
        let item = req.body
       console.log(item)
        const user = new EmployeeData(item)
        const savedUser = await user.save() 
        res.send()
        console.log(savedUser)
    }
    catch(error){
        console.log(error);
    }
})

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', (req,res)=>{
  EmployeeData.findByIdAndRemove(req.params.id).then(function(data){
    res.send(data)
  })
})

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
  EmployeeData.findByIdAndUpdate({"_id":req.body._id},req.body).then((data)=>{
      res.send(data);
  })
  })  

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000,()=>{                                             // listening to port
    console.log("server listening to port 3000...")
})