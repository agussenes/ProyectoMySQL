const express = require('express');
const multer = require('multer');
const productoController = require('../controllers/productoController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', (req, res) => { res.render('home') }); // Home

router.get('/productos', productoController.list) // rutas CRUD

router.get('/productos/create', productoController.create);
router.post('/productos/create', upload.single('imagen'), productoController.store);

router.get('/productos/:id/edit', productoController.edit);
router.put('/productos/:id', upload.single('imagen'), productoController.update);

router.delete('/productos/:id', productoController.destroy);


module.exports = router;
