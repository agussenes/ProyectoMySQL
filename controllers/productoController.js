const { Producto, Categoria, Usuario } = require('../models');

const productoController = {
    list: async (req, res) => {
        try {
            const productos = await Producto.findAll({
                include: [
                    { model: Categoria, as: 'Categoria' },
                    { model: Usuario, as: 'Usuario' }
                ]
            })
            console.log(productos); // Inspecciona qué productos devuelve la consulta
            res.render('productos/list', { productos });
        } catch (error) {
            console.error('Error al obtener productos:', error); // Detalla el error
            res.status(500).send({ message: 'Error al obtener los productos' });
        }
    },

    create: async (req, res) => {
        try {
            const categorias = await Categoria.findAll()
            res.render('productos/create', { categorias });
        } catch {
            res.status(500).send({ message: 'Error al crear los productos' });
        }
    },

    store: async (req, res) => {
        const { nombre, descripcion, precio, categoria_id } = req.body;
        const imagen = req.file ? req.file.filename : null;
    
        try {
            await Producto.create({
                nombre,
                descripcion,
                precio,
                categoria_id,
                imagen
            });
            res.redirect('/productos');
        } catch (error) {
            console.error('Error al guardar producto:', error);
            res.status(500).send({ message: 'Error al guardar los productos' });
        }
    },

    edit: async (req, res) => {
        try {
            const { id } = req.params; // Extrae el id de los parámetros
            const producto = await Producto.findByPk(id, {
                include: [{ model: Categoria, as: 'Categoria' }]
            });
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            const categorias = await Categoria.findAll();
            res.render('productos/edit', { producto, categorias });
        } catch (error) {
            console.error('Error al editar el producto:', error); // Detalla el error
            res.status(500).send({ message: 'Error al editar los productos' });
        }
    },
    
    update: async (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria_id } = req.body;
        const imagen = req.file ? req.file.filename : null;
    
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
    
            producto.nombre = nombre;
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.categoria_id = categoria_id;
            producto.imagen = imagen;
            await producto.save();
    
            res.redirect('/productos');
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).send({ message: 'Error al actualizar los productos' });
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params;
    
        try {
            await Producto.destroy({ where: { producto_id: id } });
            res.redirect('/productos');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).send({ message: 'Error al eliminar los productos' });
        }
    }
    



}

module.exports = productoController;