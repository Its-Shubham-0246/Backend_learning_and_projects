const http = require('http');

const server = http.createServer((req,res) =>{
  console.log(req.url, req.method, req.headers);
  if(req.url === '/'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Page heading</title><head>');
  res.write('<body><h1>Welcome to the home page</h1></body>');
  res.write('</html>');
  return res.end();
  }else if(req.url === '/products'){
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Page heading</title><head>');
  res.write('<body><h1>Checkout my products</h1></body>');
  res.write('</html>');
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
