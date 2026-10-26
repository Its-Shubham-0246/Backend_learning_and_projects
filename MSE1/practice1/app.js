const express = require('express');

const app = express();
const pollRoutes = require('./routes/pollRoutes');
const PORT = 8000;
app.use(express.json());
app.use('/api',pollRoutes);

app.use((err,req,res,next) => {
  if(err instanceof SyntaxError && err.status === 400){
    return res.status(400).json({
      message:"Invalid JSON"
    });
  }

  res.status(500).json({
    message:"Internal server Error"
  });
});

app.listen(PORT,() => {
  console.log(`Server is Running at the Address http://localhost:${PORT}`);
});