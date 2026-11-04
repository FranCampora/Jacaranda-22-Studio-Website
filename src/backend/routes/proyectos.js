const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

// Rutas CRUD de Proyectos
router.get('/', proyectosController.listar);
router.post('/', proyectosController.crear);
router.get('/:id', proyectosController.obtenerPorId);
router.put('/:id', proyectosController.actualizar);
router.delete('/:id', proyectosController.eliminar);

// Rutas de Relación Many-to-Many con Integrantes
router.get('/:id/integrantes', proyectosController.obtenerIntegrantes);
router.post('/:id/integrantes', proyectosController.asignarIntegrante);
router.delete('/:id/integrantes/:integranteId', proyectosController.desvincularIntegrante);

module.exports = router;
