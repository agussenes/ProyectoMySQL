const sequelize = require('../config/database');


const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Carrito = require('./Carrito');
const Catalogo = require('./Catalogo');


// Sincronizando os modelos com o banco de dados
sequelize.sync({ force: false }) // force: false mantém os dados existentes no banco
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

module.exports = {
    sequelize,
    Categoria,
    Producto,
    Usuario,
    Carrito,
    Catalogo,
}




