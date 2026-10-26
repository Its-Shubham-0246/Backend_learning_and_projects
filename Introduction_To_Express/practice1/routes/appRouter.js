const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/pathUtil');
router.get("/",(req,res,next) => {
  console.log("Handling / for GET",req.url, req.method);
  res.sendFile(path.join(rootDir,'views','home.html'));
});

router.get("/contact-us",(req,res,next) => {
  console.log("<h1>Handling /contact-us for GET</h1>",req.url,req.method);
  res.sendFile(path.join(rootDir,'views','contactUs.html'));
});

router.post("/contact-us",(req,res,next) => {
  console.log("Handling /contact-us for POST",req.url,req.method,req.body);
  res.sendFile(path.join(rootDir,'views','contactSended.html'));
});

module.exports = router;