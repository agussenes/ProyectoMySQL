const { Carrito, Producto, Categoria, Usuario } = require('../models');

const catalogoController = {
    // Método para listar todos os produtos
list: async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [
                { model: Categoria, as: 'Categoria' },
                { model: Usuario, as: 'Usuario' }
            ]
        });
        

        console.log('Productos encontrados:', JSON.stringify(productos, null, 2));
        res.render('catalogo', { productos: productos || [] }); 
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send({ message: 'Erro ao buscar produtos' });
    }
}
,



    // Método para criar um novo item no carrinho
    create: async (req, res) => {
        try {
            const { usuario_id, producto_id, cantidad } = req.body;

            if (!usuario_id || !producto_id || !cantidad) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            await Carrito.create({ usuario_id, producto_id, cantidad });

            res.redirect('/carrito/list'); 
        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error);
            res.status(500).json({ message: 'Erro ao adicionar item ao carrinho.' });
        }
    },

    // Método para armazenar um novo produto
    store: async (req, res) => {
        try {
            const { nombre, descripcion, precio, categoria_id } = req.body;
            const imagen = req.file ? req.file.filename : null;

            await Producto.create({
                nombre,
                descripcion,
                precio,
                categoria_id,
                imagen
            });

            res.redirect('/catalogo/list'); 
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
            res.status(500).send({ message: 'Erro ao salvar o produto.' });
        }
    },

    // Método para exibir o formulário de edição de um produto
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id, {
                include: [{ model: Categoria, as: 'Categoria' }]
            });

            if (!producto) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }

            const categorias = await Categoria.findAll();
            res.render('catalogo/edit', { producto, categorias }); 
        } catch (error) {
            console.error('Erro ao buscar o produto para edição:', error);
            res.status(500).send({ message: 'Erro ao buscar o produto para edição.' });
        }
    },

    // Método para atualizar os dados de um produto
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, categoria_id } = req.body;
            const imagen = req.file ? req.file.filename : null;

            const producto = await Producto.findByPk(id);

            if (!producto) {
                return res.status(404).send({ message: 'Produto não encontrado.' });
            }

            // Atualiza os campos do produto
            producto.nombre = nombre;
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.categoria_id = categoria_id;
            if (imagen) {
                producto.imagen = imagen;
            }

            await producto.save(); // Salva as alterações no banco
            res.redirect('/catalogo/list'); // Redireciona para a lista de produtos
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            res.status(500).send({ message: 'Erro ao atualizar o produto.' });
        }
    }
};

module.exports = catalogoController;
