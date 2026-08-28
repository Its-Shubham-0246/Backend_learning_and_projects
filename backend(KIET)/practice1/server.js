// import http from 'node:http'
// 
// const server = http.createServer((req,res) => {
//  if(req.url === '/' && req.method === 'GET'){
//   res.end("At home page")
//  }else if(req.url === '/about' && req.method === 'Get'){
//   req.end('Code is about request and response')
//  }else if(req.url === '/contact' && req.method === 'Get'){
//   req.end("")
//  }else{
//   
//  }
//  res.end("Hello all there!")
// })
// 
// server.listen(3000,() => {
//  console.log("Server Started")
// })
// 
const express = require('express')
const app = express()
app.listen('3000',()=>{
  console.log('Server Started')
})

app.get('/',(req,res) =>{
  res.json([
    { name:"Shubham Maurya"} ,
    { rollNo: 247 }
  ])
})
