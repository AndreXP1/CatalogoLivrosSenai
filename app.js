// app.js
const express = require('express');
const path = require('path');
const conectarMongo = require('./db');
const Livro = require('./models/Livro');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión MongoDB
conectarMongo();

// Rutas API
app.get('/api/livros', (req, res) => {
  try {
    const livros =  Livro.find();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

app.delete('/api/livros/:id', async (req, res) => {
  try {
    await Livro.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao remover livro' });
  }
});

app.post('/api/livros', async (req, res) => {
  try {
    const novoLivro = new Livro(req.body);
    await novoLivro.save();
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar livro' });
  }
});



// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta
const PORT = process.env.PORT && 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
