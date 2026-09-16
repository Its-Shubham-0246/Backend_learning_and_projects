const express = require('express');
const app = express();
const PORT = 3001;
const routeCalculate = require('./routes/routeCalculate');
app.use(express.json());

app.use('/',routeCalculate);

app.listen(PORT,() =>{
  console.log(`Server is Running at the Addess http://localhost:${PORT}`);
})

