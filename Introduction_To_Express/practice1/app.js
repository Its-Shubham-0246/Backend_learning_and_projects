const express = require('express');

const app = express();

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

app.get("/",(req,res,next) => {
  console.log("Handling / for GET",req.url, req.method);
  res.send(`<h1>You are on the Home Page</h1>`)
});

app.get("/contact-us",(req,res,next) => {
  console.log("<h1>Handling /contact-us for GET</h1>",req.url,req.method);
  res.send(`
    <h1> Submit Your Details</h1>
    <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="Enter Your Name"/>
    <input type="email" name="email" placeholder="Enter Your Email"/>
    <input type="Submit"/>
    </form>
    `);
});

app.post("/contact-us",(req,res,next) => {
  console.log("Handling /contact-us for POST");
  res.send("<h1>We will Contact You sortly</h1>")
});

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`Server is Runnig at the Address http://localhost:${PORT}`);
})