const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');//antes de llamar a las funciones del controlador, necesita conectarse con el contrador

//mas endpoints pero unicamente de los proyectos. 

// Rutas CRUD de Proyectos. El verbo lo leé de la request que le llegó del server.js
//Dependiendo del metodo HTTP (GET, POST, PUT, DELETE) y de la ruta, se ejecuta la funcion correspondiente del controller
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
