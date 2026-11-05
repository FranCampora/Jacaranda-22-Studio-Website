const express = require('express');
const router = express.Router();
const integrantesController = require('../controllers/integrantesController');

//mas endpoints pero unicamente de los integrantes. 
router.get('/', integrantesController.listar);
router.post('/', integrantesController.crear);
router.get('/:id', integrantesController.obtenerPorId);
router.put('/:id', integrantesController.actualizar);
router.delete('/:id', integrantesController.eliminar);

module.exports = router;
