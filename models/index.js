const sequelize = require('../config/database');


const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');

module.exports = {
    sequelize,
    Categoria,
    Producto,
    Usuario
}