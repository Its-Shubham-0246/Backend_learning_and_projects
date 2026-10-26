const express = require('express');
const app = express();
const appRouter = require('./routes/appRouter');
const path = require('path');
const rootDir = require('./utils/pathUtil');
app.use(express.urlencoded());
app.use((req,res,next) => {
  console.log("First dummy Middleware",req.url,req.method);
  next();
});
app.use((req,res,next) => {
  console.log("Second dummy Middleware",req.url,req.method);
  next();
});

// app.use((req,res,next) => {
//   console.log("Third Middleware",req.url,req.method);
//   res.send("<p>Welcome to the Practice Set</p>")
// });
app.use(appRouter);
app.use((req,res,next) => {
  res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`Server is Runnig at the Address http://localhost:${PORT}`);
})