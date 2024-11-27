const Catalogo = require('./Catalogo');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Carrito = require('./Carrito');

// Definir as relações entre os modelos
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'Productos' });  // Alias alterado para 'Productos'
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });  // Mantém 'Categoria' como alias para a associação reversa

Usuario.hasMany(Producto, { foreignKey: 'usuario_id', as: 'Usuario' });
Producto.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'Usuario' });

Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });

Catalogo.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Catalogo.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = { Categoria, Producto, Usuario, Catalogo, Carrito };
