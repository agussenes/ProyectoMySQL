const express = require('express');
const router = express.Router();

// GET Contact Page
router.get('/', (req, res) => {
    res.render('contacto');
});

// POST Contact Form
router.post('/', (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    console.log(`Mensaje recibido de ${nombre} (${correo}): ${mensaje}`);
    res.redirect('/contacto');
});

module.exports = router;
