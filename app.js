const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const livrosFilePath = path.join(__dirname, 'public', 'libros.json');

app.get('/api/livros', (req, res) => {
  const data = fs.readFileSync(livrosFilePath, 'utf-8');
  res.json(JSON.parse(data).livros);
});

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

app.delete('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = JSON.parse(fs.readFileSync(livrosFilePath, 'utf-8'));
  const livros = data.livros.filter(livro => livro.id !== id);

  fs.writeFileSync(livrosFilePath, JSON.stringify({ livros }, null, 2), 'utf-8');
  res.status(204).send();
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/openlibrary/:titulo', async (req, res) => {
  const titulo = req.params.titulo;
  try {
    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}&limit=5`);
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      return res.json([]);
    }


    const livros = data.docs.map(doc => ({
      id: null, 
      titulo: doc.title,
      autor: doc.author_name ? doc.author_name[0] : "Desconhecido",
      ano: doc.first_publish_year || "N/A"
    }));

    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar na OpenLibrary:", error);
    res.status(500).json({ error: "Erro ao buscar livro externo" });
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
