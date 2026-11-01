const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const taskroute = require('./router/taskRoute')
const errorHandler = require('./middleware/errorHandler')
const rateLimit = require('./middleware/rateLimit')
const app = express()
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Database Connected  Successfully");
})
.catch((error) => {
  console.log("Database not Connected",error);
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

app.use(express.json())
app.use(rateLimit)
app.use('/', taskroute)
app.use(errorHandler)

app.listen(5050, () => {
  console.log('server listening')
})