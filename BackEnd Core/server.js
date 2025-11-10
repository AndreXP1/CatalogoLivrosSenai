const express = require('express');
const path = require('path');
const app = express();

// Configura a pasta 'public' como estática
app.use(express.static(path.join(__dirname, 'FrontCore')));

// Rota principal (opcional, pois já serve index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontCore/html', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));