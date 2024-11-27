const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Producto = require('./Producto');

const Catalogo = sequelize.define('Catalogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    id_producto: {
        type: DataTypes.INTEGER
    },
    nombre_producto: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'catalogo',
    timestamps: false
});

Catalogo.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Catalogo.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = Catalogo;










module.exports = Catalogo;