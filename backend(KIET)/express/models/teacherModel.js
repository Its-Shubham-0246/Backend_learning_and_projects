const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  branch:{
    type:String,
    required:true
  }
})

const Teacher = mongoose.model("Teacher",teacherSchema)

module.exports = Teacher