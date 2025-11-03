const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configura a pasta 'public' como estática
app.use(express.static(path.join(__dirname, 'public')));

// Caminho para o arquivo JSON
const livrosFilePath = path.join(__dirname, 'public', 'libros.json');

// Rota para obter todos os livros
app.get('/api/livros', (req, res) => {
  const data = fs.readFileSync(livrosFilePath, 'utf-8');
  res.json(JSON.parse(data).livros);
});

// Rota para adicionar um novo livro
app.post('/api/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;
  const data = JSON.parse(fs.readFileSync(livrosFilePath, 'utf-8'));
  const livros = data.livros;

  const novoLivro = {
    id: livros.length ? livros[livros.length - 1].id + 1 : 1,
    titulo,
    autor,
    ano
  };

  livros.push(novoLivro);
  fs.writeFileSync(livrosFilePath, JSON.stringify({ livros }, null, 2), 'utf-8');
  res.status(201).json(novoLivro);
});

// Rota para remover um livro
app.delete('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = JSON.parse(fs.readFileSync(livrosFilePath, 'utf-8'));
  const livros = data.livros.filter(livro => livro.id !== id);

  fs.writeFileSync(livrosFilePath, JSON.stringify({ livros }, null, 2), 'utf-8');
  res.status(204).send();
});

// Rota principal (opcional, pois já serve index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));