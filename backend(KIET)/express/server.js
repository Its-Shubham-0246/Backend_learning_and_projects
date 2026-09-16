const path = require('path')
const studentRoutes = require('./Routes/studentRoutes')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require("express")
const mongoose = require('mongoose')
const app = express()
app.use(express.json()) //middleware
const PORT = process.env.PORT||3030
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
  console.log("Database Connected");
})
.catch((error) =>{
  console.log("Database can't connected",error);
})

app.use('/students',studentRoutes)

app.listen(PORT,() =>{
  console.log(`Server is Running at Address http://localhost:${PORT}`)
})