const requestHandler = (req,res) => {
  console.log(req.url, req.method);
  if(req.url === '/'){
    res.setHeader('Content-Type','text/html');
    res.write(`
      <html>
        <head><title> Practice Set</title></head>
        <body>
          <h1>Welcome to the Calculator Home Page</h1>
          <li><a href='/calculator'>Calculator</a></li>
        </body>
      </html>
    `);
    return res.end();
  }else if(req.url === '/calculator'){
    res.setHeader('Content-Type','text/html');
    res.write(`
      <html>
      <head><title>Practice Set</title></head>
      <body>
      <form action='/calculate-result' method='POST'>
      <label for='num1'>Num1</label>
      <input type='number' name='num1'/>
      <label for='num2'>Num2</label>
      <input type='number' name='num2'/>
      <input type='submit' value='Sum'>
      </form>
      </body>
      </html>
    `);
    return res.end();
  }else if(req.url.toLowerCase() === '/calculate-result' && req.method === 'POST'){
    const body = [];
    req.on('data',(chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end',() => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const objectBody = Object.fromEntries(params);
      const sum = Number(objectBody.num1) + Number(objectBody.num2);
      console.log(objectBody);
      res.setHeader('Content-Type','text/html');
      res.write(`<h1>Sum:- ${sum}</h1>`)
      return res.end();
    });
    return;
  }
  res.setHeader('Content-Type','text/html');
  res.write(`
    <html>
      <head><title> Practice Set</title></head>
      <body>
        <h1>404 Page does not exist</h1>    
      </body>
    </html>
  `);
  return res.end();
}

module.exports = requestHandler;