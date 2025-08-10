const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
  console.log(req.url, req.method);
   
  //definindo o tipo de conteúdo do cabeçalho
  res.setHeader('Tipo-Conteudo', 'texto/simples');

  let caminho = './views/';
  
  switch (req.url) {
    case '/':
      caminho += 'index.html';
      res.statusCode = 200;
      break;

    case '/contato':
      caminho += 'contato.html';
      res.statusCode = 200;
      break;

    case '/servico':
      res.statusCode = 301;
      res.setHeader('Location', '/servico');
      res.end();
      return;

    default:
      caminho += 'paginadeerro.html';
      res.statusCode = 404;
      break;
  }

  // Lê e envia o arquivo HTML

  fs.readFile(caminho, (err, data)=>{
    if(err){
        console.log(err);
        res.end();
    }else{
        //res.write
        res.write(data);
        res.end();
    }
});

});

server.listen(3009, 'localhost', () => {
console.log("ouvindo requisição na porta 3009");
});
