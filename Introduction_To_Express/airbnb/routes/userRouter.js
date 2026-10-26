const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const userRouter = express.Router();

userRouter.get("/",(req,res,next) => {
  res.sendFile(path.join(rootDir,'views','home.html'));
});

module.exports = userRouter;