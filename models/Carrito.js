const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario'); // Certifique-se de que este modelo está configurado corretamente
const Producto = require('./Producto'); // Certifique-se de que este modelo está configurado corretamente

// Definindo o modelo Carrito
const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Auto incremento para o ID
        primaryKey: true,    // Chave primária
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,    // Não pode ser nulo
        references: {
            model: Usuario,  // Chave estrangeira para o modelo 'Usuario'
            key: 'id',       // Campo referenciado
        },
        onUpdate: 'CASCADE',  // Atualiza em cascata quando 'usuario' for atualizado
        onDelete: 'CASCADE',  // Deleta em cascata quando 'usuario' for deletado
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,    // Não pode ser nulo
        references: {
            model: Producto,  // Chave estrangeira para o modelo 'Producto'
            key: 'productos_id', // Agora o campo correto é 'productos_id'
        },
        onUpdate: 'CASCADE',  // Atualiza em cascata quando 'producto' for atualizado
        onDelete: 'CASCADE',  // Deleta em cascata quando 'producto' for deletado
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,    // Não pode ser nulo
        defaultValue: 1,     // Valor padrão de 1
        validate: {
            min: 1,          // Validação para que a quantidade seja no mínimo 1
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Definir o valor padrão para o campo 'created_at'
    },
}, {
    tableName: 'carrito',  // Nome da tabela no banco de dados
    timestamps: false,     // Desabilitar os timestamps automáticos (created_at e updated_at)
});

// Definindo os relacionamentos
Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });


module.exports = Carrito;
