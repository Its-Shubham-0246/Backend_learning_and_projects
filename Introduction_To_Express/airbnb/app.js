const express = require('express');
const path = require('path');
const app = express();

const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
app.use(express.urlencoded());
app.use(userRouter);
app.use('/host',hostRouter);
app.use(express.static(path.join(rootDir,'public')))

app.use((req,res,next) => {
  res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});
const PORT = 3001;

app.listen(PORT,() => {
  console.log(`Server is Running at the Address http://localhost:${PORT}`);
});