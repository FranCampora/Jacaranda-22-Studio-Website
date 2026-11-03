const express = require('express');
const router = express.Router();
const integrantesService = require('../services/integrantesService');

//GET DE TODOS LOS INTEGRANTES
router.get('/', (req, res) => {
    res.status(200).json(integrantesService.obtenerTodos());
});

//POST - crear un nuevo integrante
//chekear la barra sola
router.post('/', (req, res) => {
    const errores = integrantesService.validar(req.body);
    if (errores.length > 0) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
    }
    const nuevoIntegrante = integrantesService.crear(req.body);
    res.status(201).location(`/api/integrantes/${nuevoIntegrante.id}`).json(nuevoIntegrante);
});

//GET - obtener un integrante por ID
router.get('/:id', (req, res) => {
    const integrante = integrantesService.obtenerPorId(req.params.id);
    if (!integrante) {
        return res.status(404).json({ error: 'Integrante no encontrado' });
    }
    res.status(200).json(integrante);
});

//PUT - actualizar un integrante existente por ID
//si no existe devuelve 404, si los datos son inválidos devuelve 400
router.put('/:id', (req, res) => {
    if (!integrantesService.obtenerPorId(req.params.id)) {
        return res.status(404).json({ error: 'Integrante no encontrado' });
    }
    const errores = integrantesService.validar(req.body);
    if (errores.length > 0) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
    }
    const actualizado = integrantesService.actualizar(req.params.id, req.body);
    res.status(200).json(actualizado);
});

//DELETE - borrar un integrante por ID
//si no existe devuelve 404
router.delete('/:id', (req, res) => {
    const borrado = integrantesService.eliminar(req.params.id);
    if (!borrado) {
        return res.status(404).json({ error: 'Integrante no encontrado' });
    }
    res.status(204).send();
});

module.exports = router;