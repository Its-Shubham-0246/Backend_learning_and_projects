http = require('http');

const server = http.createServer((req,res) => {
  console.log(req.url, req.method);
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Myntra</title></head>');
  res.write('<body>');
  res.write('<header>');
  res.write('<nav>');
  res.write('<ul>');
  res.write('<li><a href="/">home</a></li>');
  res.write('<li><a href="/men">men</a></li>');
  res.write('<li><a href="/women">women</a></li>');
  res.write('<li><a href="/kids">kids</a></li>');
  res.write('<li><a href="/cart">cart</a></li>');
  res.write('</ul>');
  res.write('</nav>');
  res.write('</header>');
  if(req.url === '/'){
    res.write('<h1>Welcome to Home Page</h1>')
  }else if(req.url === '/men'){
    res.write('<h1>Welcome to the men page</h1>');
  }else if(req.url === '/women'){
    res.write('<h1>Welcome to the Women page</h1>');
  }else if(req.url === '/kids'){
    res.write('<h1>Welcome to the Kids page</h1>');
  }else if(req.url === '/cart'){
    res.write('<h1>Welcome to the cart page</h1>');
  }else{
    res.write('<h1>Invalid page</h1>');
  }
  res.write('</body>');
  res.write('</html>');
  res.end();
});
const PORT = 3001;
server.listen(PORT,()=>{
  console.log(`Server is Running at address http://localhost:${PORT}`);
})