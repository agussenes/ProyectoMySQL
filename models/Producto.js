const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');


const Producto = sequelize.define('Producto', {
    producto_id: { // Define la clave primaria como producto_id
        type: DataTypes.INTEGER,
        primaryKey: true, // Marca esta columna como la clave primaria
        autoIncrement: true // Configura el autoincremento
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categoria',
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    }
}, {
    tableName: 'Productos',
    timestamps: false
});

Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });  // Associação para Categoria
Producto.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'Usuario' });  // Associação para Usuario


module.exports = Producto;
