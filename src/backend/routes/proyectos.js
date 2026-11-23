const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const proyectosController = require('../controllers/proyectosController');//antes de llamar a las funciones del controlador, necesita conectarse con el contrador

//endpoints de los proyectos. 

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
=======
const proyectosService = require('../services/proyectosService');

//GET DE TODOS LOS PROYECTOS
router.get('/', (req, res) => {
    res.status(200).json(proyectosService.obtenerTodos());
});

//POST - crear un nuevo proyecto
router.post('/', (req, res) => {
    const errores = proyectosService.validar(req.body);
    if (errores.length > 0) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
    }
    const nuevoProyecto = proyectosService.crear(req.body);
    res.status(201).location(`/api/v1/proyectos/${nuevoProyecto.id}`).json(nuevoProyecto);
});

//GET - obtener un proyecto por ID
router.get('/:id', (req, res) => {
    const proyecto = proyectosService.obtenerPorId(req.params.id);
    if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(200).json(proyecto);
});

//PUT - actualizar un proyecto existente por ID
//si no existe devuelve 404, si los datos son inválidos devuelve 400
router.put('/:id', (req, res) => {
    if (!proyectosService.obtenerPorId(req.params.id)) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    if (!proyectosService.datosValidos(req.body)) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    const actualizado = proyectosService.actualizar(req.params.id, req.body);
    res.status(200).json(actualizado);
});

//DELETE - borrar un proyecto por ID
//si no existe devuelve 404
router.delete('/:id', (req, res) => {
    const borrado = proyectosService.eliminar(req.params.id);
    if (!borrado) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.status(204).send();
});

module.exports = router;
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
