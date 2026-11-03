const express = require('express');
const router = express.Router();
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