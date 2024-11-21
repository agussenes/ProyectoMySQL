const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');

// Definir relaciones
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'Productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });

Usuario.hasMany(Producto, { foreignKey: 'usuario_id', as: 'ProductosUsuario' });
Producto.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'Usuario' });

module.exports = { Categoria, Producto, Usuario };
