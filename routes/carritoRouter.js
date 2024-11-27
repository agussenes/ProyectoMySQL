const express = require('express');
const carritoController = require('../controllers/carritoController');
const router = express.Router();


router.get('/', carritoController.list);

router.post('/add', carritoController.addToCart);

router.post('/comprar/:id', carritoController.comprar);

router.post('/comprar-todos', carritoController.comprarTodos);

router.delete('/delete/:id', carritoController.destroy);

module.exports = router;

