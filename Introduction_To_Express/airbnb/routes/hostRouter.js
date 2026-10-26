const express = require("express");
const path = require('path');
const rootDir = require('../utils/pathUtil');
const hostRouter = express.Router();


hostRouter.get("/host/add-home",(req,res,next) => {
  res.sendFile(path.join(rootDir,'views','addHome.html'));
});

hostRouter.post("/host/add-home",(req,res,next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir,'views','homeAdded.html'));
});

module.exports = hostRouter;
