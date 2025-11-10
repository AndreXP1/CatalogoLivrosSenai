const mongoose = require('mongoose');

function conectarMongo() {
  try {
    mongoose.connect(
      'mongodb+srv://s312:SaVm2511@test.ikptu6d.mongodb.net/catalogoLivros?retryWrites=true&w=majority&authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('✅ Conectado ao MongoDB Atlas!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = conectarMongo;
