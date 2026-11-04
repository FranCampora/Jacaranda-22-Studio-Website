const express = require('express');
const router = express.Router();
const integrantesController = require('../controllers/integrantesController');

// Rutas CRUD de Integrantes
router.get('/', integrantesController.listar);
router.post('/', integrantesController.crear);
router.get('/:id', integrantesController.obtenerPorId);
router.put('/:id', integrantesController.actualizar);
router.delete('/:id', integrantesController.eliminar);

module.exports = router;
