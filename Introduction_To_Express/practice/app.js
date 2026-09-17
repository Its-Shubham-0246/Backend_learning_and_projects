const http = require('http');

const express = require('express');

const app = express();

app.use("/",(req,res,next) => {
  console.log("Came at the first middleware",req.url,req.method);
  next();
})

app.use("/submit-details",(req,res,next) =>{
  console.log("Came at the Second Middleware",req.url,req.method);
  res.send("<p>Welcome to the first page</p>")
})

const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT,() =>{
   console.log(`Server is Running at the Address http://localhost:${PORT}`);
})