const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la instancia de Sequelize

const Categoria = sequelize.define('Categoria', {
    categoria_id: { // Define explícitamente la clave primaria
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;
