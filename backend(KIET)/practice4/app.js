const express = require('express');

const app = express();
const PORT = 3002;

app.listen(PORT,() => {
  console.log(`Server is Running at the Address http://localhost:${PORT}`);
})