const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) =>{
  console.log(req.url, req.method);
  if(req.url === '/'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Page heading</title><head>');
  res.write('<body><h1>Enter Your Details:-</h1>');
  res.write('<form action="/submit-details" method="POST">');
  res.write('<input type="text" name="username" placeholder="Enter your name">');
  res.write('<label for="male">Male</label>');
  res.write('<input type="radio" id="male" name="gender" value="male">');
  res.write('<label for="female">Female</label>');
  res.write('<input type="radio" id="female" name="gender" vale="female">');
  res.write('<input type="submit" value="Submit">');
  res.write('</form>');
  res.write('</body>');
  res.write('</html>');
  return res.end();
  }else if(req.url.toLowerCase() === '/submit-details' && req.method === 'POST'){
    const body = [];
    req.on('data',(chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end',() => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      // const objectBody = {};
      // for([key,val]  of params.entries()){
      //   objectBody[key] = val;
      // }
      const objectBody = Object.fromEntries(params);
      console.log(objectBody);
      fs.writeFileSync("user.txt",JSON.stringify(objectBody));
    });
    res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Page heading</title><head>');
  res.write('<body><h1>page content</h1></body>');
  res.write('</html>');
  return res.end();
});

const PORT = 3001;
server.listen(PORT,() =>{
  console.log(`Server is Running at Address http://localhost:${PORT}`);
});
