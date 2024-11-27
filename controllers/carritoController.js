const { Carrito, Producto } = require('../models');

const carritoController = {

    // Método para listar os itens do carrinho
    list: async (req, res) => {
        try {
            if (!req.session.carrinho || req.session.carrinho.length === 0) {
                return res.render('carrito/list', { productos: [], total: 0 });
            }
    
            const productos = req.session.carrinho;
            console.log(productos); 
    
            // Para garantir que o total seja calculado corretamente
            const total = productos.reduce(
                (sum, producto) => {
                    const precio = parseFloat(producto.precio) || 0;
                    const cantidad = parseInt(producto.cantidad) || 0;
                    return sum + precio * cantidad;
                },
                0
            );
    
            res.render('carrito/list', { productos, total });
        } catch (error) {
            console.error('Erro ao carregar o carrinho:', error);
            res.status(500).json({ message: 'Erro ao carregar o carrinho.' });
        }
    },

// Método para adicionar ao carrinho
addToCart: (req, res) => {
    const { producto_id, precio, nombre, imagen } = req.body; 

    // Se o carrinho não existir, cria um carrinho vazio
    if (!req.session.carrinho) {
        req.session.carrinho = [];
    }

    // Verifica se o produto já existe no carrinho
    const productoExistente = req.session.carrinho.find(item => item.producto_id === producto_id);

    if (productoExistente) {
        // Se o produto já existe, incrementa a quantidade
        productoExistente.cantidad += 1;
    } else {
        // Caso contrário, adiciona o novo produto ao carrinho com quantidade 1
        req.session.carrinho.push({
            producto_id, 
            precio, 
            nombre, 
            imagen, 
            cantidad: 1 // Inicia com  1
        });
    }

    // Salva a sessão com o carrinho atualizado
    req.session.save((err) => {
        if (err) {
            console.error('Erro ao salvar a sessão:', err);
            return res.status(500).send('Erro ao adicionar produto ao carrinho.');
        }
        res.redirect('/catalogo');  
    });
},

    // Método para remover um produto do carrinho
    destroy: (req, res) => {
        const { id } = req.params;

        if (req.session.carrinho) {
            const productoIndex = req.session.carrinho.findIndex(
                (item) => parseInt(item.producto_id) === parseInt(id)
            );

            if (productoIndex !== -1) {
                if (req.session.carrinho[productoIndex].cantidad > 1) {
                    req.session.carrinho[productoIndex].cantidad -= 1;
                } else {
                    req.session.carrinho.splice(productoIndex, 1);
                }
            }

            req.session.save((err) => {
                if (err) {
                    console.error('Erro ao salvar a sessão:', err);
                    return res.status(500).send('Erro ao remover produto do carrinho.');
                }
                res.redirect('/carrito');
            });
        } else {
            return res.status(404).send('Carrinho não encontrado na sessão.');
        }
    },

    // Método para comprar um produto
    comprar: async (req, res) => {
        const { id } = req.params;
    
        try {
            console.log('Tentando comprar o produto com id:', id); // Log para verificar o id
    
            // Tenta encontrar o produto no banco de dados
            const item = await Carrito.findByPk(id, {
                include: { model: Producto, as: 'Producto' }
            });
    
            if (!item) {
                console.log('Produto não encontrado no carrinho');
                return res.status(404).send({ message: 'Produto não encontrado no carrinho.' });
            }
    
            console.log('Produto encontrado no carrinho:', item);
    
            // Realiza a compra (aqui você pode adicionar lógica para salvar a compra, se necessário)
            await item.destroy();  // Remove o item do carrinho após a compra
    
            console.log('Produto comprado e removido do carrinho');
            res.redirect('/carrito');
        } catch (error) {
            console.error('Erro ao comprar produto:', error);
            res.status(500).send({ message: 'Erro ao comprar produto.' });
        }
    },

    // Método para comprar todos os produtos
    comprarTodos: async (req, res) => {
    try {
        console.log('Tentando comprar todos os produtos');

        const productos = req.session.carrinho;

        // Verifica se o carrinho está vazio
        if (productos.length === 0) {
            console.log('Carrinho vazio, não há produtos para comprar.');
            return res.redirect('/carrito');
        }

        // Exibe os produtos do carrinho
        console.log('Produtos no carrinho:', productos);

        // Redireciona para a página de compra com todos os itens do carrinho
        res.render('carrito/comprar', { productos });
    } catch (error) {
        console.error('Erro ao comprar todos os produtos:', error);
        res.status(500).send({ message: 'Erro ao comprar todos os produtos.' });
    }
},
};

module.exports = carritoController;
