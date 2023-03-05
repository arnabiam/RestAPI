const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

require("./db/conn")
const Student = require('./models/students')

//create a new router

const router = new express.Router();

//We need to define the router
// We need to register the router


// app.get("/" , (req,res) =>{
//     res.send("Hello From the other sides by Arnab");
// })
//Create a new Students
// app.post("/students" , (req,res) =>{
  
//     console.log(req.body);

//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(404).send(e);
//     });
    
// })

app.post("/students" , async(req,res)=>{
    
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
       res.status.send(404).send(e)
    }

    
})

app.get("/students" , async(req,res)=>{
    try{
        const studenstData=await Student.find();
        res.status(201).send(studenstData);
    }catch(e){
        res.status(404).send(e);
    }
})

//get individual data
app.get("/students/:id", async (req,res)=>{
    try{
       const _id = req.params.id;
    // //    res.send(_id)
    // console.log(_id)
    const studentData = await Student.findById(_id);
    console.log(studentData);
    res.status(201).send(studentData);
    }
    catch(e){
      res.status(404).send(e)
    }
})

app.patch("/students/:id", async (req,res)=>{
    try{
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id , req.body,{
        new: true  //jokhone korbo tokhone hobe
    });
    res.send(updateStudent);
    } catch(e){
      res.status(404).send(e)
    }
})

app.delete("/students/:id", async (req, res)=>{
    try{
        const _id = req.params.id;
        const deletedData = await Student.findByIdAndDelete(_id);
        if(!res.params.id){
            return res.status(404).send();
        }
        res.send(deletedData)
    }catch(e){
        res.send(e)
    }
})

app.listen(port , ()=>{
    console.log(`Connection is setup at ${port}`)
})