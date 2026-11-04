const proyectosService = require('../services/proyectosService');

function listar(req, res) {
    const proyectos = proyectosService.obtenerTodos();
    return res.status(200).json(proyectos);
}

function obtenerPorId(req, res) {
    const proyecto = proyectosService.obtenerPorId(req.params.id);
    if (!proyecto) {
        return res.status(404).json({
            status: 'Error',
            error: 'Proyecto no encontrado'
        });
    }
    return res.status(200).json(proyecto);
}

function crear(req, res) {
    const errores = proyectosService.validar(req.body, false);//llama a la funcion validar del service, le pasa el body de la request y un booleano que indica si es una actualizacion o no
    //guarda la data en la variable
    // si hay errores, devuelve un 400 con los errores y corta la ejecucion de la funcion. Si no hay errores, continua con la creacion del proyecto
    if (errores.length > 0) {
        return res.status(400).json({
            status: 'Error',
            error: 'Datos de entrada inválidos',
            detalles: errores
        });
    }
    //si el array de erorres esta vacio, crea el proyecto
    const nuevoProyecto = proyectosService.crear(req.body);
    return res
        .status(201)
        .location(`/api/v1/proyectos/${nuevoProyecto.id}`)
        .json(nuevoProyecto);
}

function actualizar(req, res) {
    const existe = proyectosService.obtenerPorId(req.params.id);
    if (!existe) {
        return res.status(404).json({
            status: 'Error',
            error: 'Proyecto no encontrado'
        });
    }

    const errores = proyectosService.validar(req.body, true);
    if (errores.length > 0) {
        return res.status(400).json({
            status: 'Error',
            error: 'Datos de entrada inválidos',
            detalles: errores
        });
    }

    const actualizado = proyectosService.actualizar(req.params.id, req.body);
    return res.status(200).json(actualizado);
}

function eliminar(req, res) {
    const eliminado = proyectosService.eliminar(req.params.id);
    if (!eliminado) {
        return res.status(404).json({
            status: 'Error',
            error: 'Proyecto no encontrado'
        });
    }
    return res.status(204).send();
}

// Endpoints de relación Many-to-Many
function obtenerIntegrantes(req, res) {
    const integrantes = proyectosService.obtenerIntegrantes(req.params.id);
    if (integrantes === null) {
        return res.status(404).json({
            status: 'Error',
            error: 'Proyecto no encontrado'
        });
    }
    return res.status(200).json(integrantes);
}

function asignarIntegrante(req, res) {
    const { integrante_id, rol_en_proyecto } = req.body;

    if (!integrante_id) {
        return res.status(400).json({
            status: 'Error',
            error: 'El campo "integrante_id" es obligatorio en el cuerpo de la petición.'
        });
    }

    const resultado = proyectosService.asignarIntegrante(req.params.id, integrante_id, rol_en_proyecto);
    if (resultado.error === 'NOT_FOUND_PROYECTO') {
        return res.status(404).json({ status: 'Error', error: 'Proyecto no encontrado' });
    }
    if (resultado.error === 'NOT_FOUND_INTEGRANTE') {
        return res.status(404).json({ status: 'Error', error: 'Integrante no encontrado' });
    }

    return res.status(200).json({
        status: 'OK',
        mensaje: 'Integrante vinculado exitosamente al proyecto'
    });
}

function desvincularIntegrante(req, res) {
    const resultado = proyectosService.desvincularIntegrante(req.params.id, req.params.integranteId);
    if (resultado.error === 'NOT_FOUND_PROYECTO') {
        return res.status(404).json({ status: 'Error', error: 'Proyecto no encontrado' });
    }
    if (resultado.error === 'NOT_FOUND_RELACION') {
        return res.status(404).json({ status: 'Error', error: 'El integrante no estaba asignado a este proyecto' });
    }

    return res.status(204).send();
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerIntegrantes,
    asignarIntegrante,
    desvincularIntegrante
};
