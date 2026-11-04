const integrantesService = require('../services/integrantesService');

function listar(req, res) {
    const integrantes = integrantesService.obtenerTodos();
    return res.status(200).json(integrantes);
}

function obtenerPorId(req, res) {
    const integrante = integrantesService.obtenerPorId(req.params.id);
    if (!integrante) {
        return res.status(404).json({
            status: 'Error',
            error: 'Integrante no encontrado'
        });
    }
    return res.status(200).json(integrante);
}

function crear(req, res) {
    const errores = integrantesService.validar(req.body, false);
    if (errores.length > 0) {
        return res.status(400).json({
            status: 'Error',
            error: 'Datos de entrada inválidos',
            detalles: errores
        });
    }

    const nuevoIntegrante = integrantesService.crear(req.body);
    return res
        .status(201)
        .location(`/api/v1/integrantes/${nuevoIntegrante.id}`)
        .json(nuevoIntegrante);
}

function actualizar(req, res) {
    const existe = integrantesService.obtenerPorId(req.params.id);
    if (!existe) {
        return res.status(404).json({
            status: 'Error',
            error: 'Integrante no encontrado'
        });
    }

    const errores = integrantesService.validar(req.body, true);
    if (errores.length > 0) {
        return res.status(400).json({
            status: 'Error',
            error: 'Datos de entrada inválidos',
            detalles: errores
        });
    }

    const actualizado = integrantesService.actualizar(req.params.id, req.body);
    return res.status(200).json(actualizado);
}

function eliminar(req, res) {
    const eliminado = integrantesService.eliminar(req.params.id);
    if (!eliminado) {
        return res.status(404).json({
            status: 'Error',
            error: 'Integrante no encontrado'
        });
    }
    return res.status(204).send();
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
