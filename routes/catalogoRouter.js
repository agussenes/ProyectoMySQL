const express = require('express');
const multer = require('multer');
const router = express.Router();
const catalogoController = require('../controllers/catalogoController');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', catalogoController.list);



router.get('/catalogo/create', catalogoController.create);
router.post('/catalogo/create', upload.single('imagen'), catalogoController.store);


router.get('/catalogo/:id/edit', catalogoController.edit);
router.put('/catalogo/:id', upload.single('imagen'), catalogoController.update);

module.exports = router;

