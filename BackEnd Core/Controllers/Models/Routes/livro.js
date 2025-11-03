const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: String,
    ano: String,
    autor: String,
    editora: String,
    genero: String
});