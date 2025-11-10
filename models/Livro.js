
const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model('Livro', livroSchema);

