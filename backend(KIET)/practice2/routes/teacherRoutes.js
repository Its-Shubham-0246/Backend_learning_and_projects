import express from 'express';
const router = express.Router();

router.get('/',(req,res) =>{
  res.json(teachers);
});

router.get('/',(req,res) =>{
 const {name,course,age} = req.body;
 if(!name || !course || age === undefined){
  return res.status(400).json({message: "name ,course and age are required"});
  newTeacher = {
    id:teachers.length,
    name,
    course,
    age
  }
  teachers.push(newTeacher);
   
 }
});