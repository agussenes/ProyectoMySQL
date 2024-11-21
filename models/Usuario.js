const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre no puede estar vacío'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // El email debe ser único
        validate: {
            isEmail: {
                msg: 'El email debe ser válido'
            }
        }
    }
}, 
{
    tableName: 'Usuarios', // Nombre de la tabla en la base de datos
    timestamps: false // Desactivar createdAt y updatedAt si no son necesarios
});

module.exports = Usuario;
