const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3009;

// Cria o servidor
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor Node.js rodando na porta 3009 ');
});

// Inicia o servidor na porta 3009
server.listen(3009, () => {
  console.log('Servidor iniciado em http://localhost:3009');
});

  let caminho = './views/';
  
  switch (req.url) {
    case '/':
      caminho += 'index.html';
      res.statusCode = 200;
      break;

    case '/servico':
      caminho += 'servico.html';
      res.statusCode = 200;
      break;

    case '/contato':
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
  fs.readFile(path.resolve(__dirname, caminho), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Erro interno no servidor');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});