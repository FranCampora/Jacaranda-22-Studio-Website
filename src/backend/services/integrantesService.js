const integrantesModel = require('../models/integrantesModel');
const proyectoIntegrantesModel = require('../models/proyectoIntegrantesModel');

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(body, esActualizacion = false) {
    const errores = [];

    // Validar nombre
    if (!esActualizacion || body.nombre !== undefined) {
        if (!body.nombre || typeof body.nombre !== 'string' || body.nombre.trim() === '') {
            errores.push('El campo "nombre" es obligatorio y debe ser una cadena no vacía.');
        }
    }

    // Validar rol
    if (!esActualizacion || body.rol !== undefined) {
        if (!body.rol || typeof body.rol !== 'string' || body.rol.trim() === '') {
            errores.push('El campo "rol" es obligatorio y debe ser una cadena no vacía (ej: artista, productor, sesionista, apoyo moral, etc.).');
        }
    }

    // Validar email
    if (body.email !== undefined && body.email !== null && body.email.trim() !== '') {
        if (!REGEX_EMAIL.test(body.email.trim())) {
            errores.push('El campo "email" tiene un formato inválido.');
        }
    }

    return errores;
}

function obtenerTodos() {
    return integrantesModel.obtenerTodos();
}

function obtenerPorId(id) {
    const integrante = integrantesModel.obtenerPorId(id);
    if (!integrante) return null;

    const proyectosAsignados = proyectoIntegrantesModel.obtenerProyectosDeIntegrante(integrante.id);

    // Retorno explícito campo por campo
    return {
        id: integrante.id,
        nombre: integrante.nombre,
        rol: integrante.rol,
        email: integrante.email,
        telefono: integrante.telefono,
        proyectos: proyectosAsignados
    };
}

function crear(datos) {
    //guardar en base de datos
    const nuevoIntegrante = {
        nombre: datos.nombre.trim(),
        rol: datos.rol.trim(),
        email: datos.email ? datos.email.trim() : null,
        telefono: datos.telefono ? datos.telefono.trim() : null
    };

    return integrantesModel.crear(nuevoIntegrante);
}

function actualizar(id, datos) {
    const integranteActual = integrantesModel.obtenerPorId(id);
    if (!integranteActual) return null;

    const integranteModificado = {
        nombre: (datos.nombre !== undefined && datos.nombre !== null) ? datos.nombre.trim() : integranteActual.nombre,
        rol: (datos.rol !== undefined && datos.rol !== null) ? datos.rol.trim() : integranteActual.rol,
        email: (datos.email !== undefined) ? (datos.email ? datos.email.trim() : null) : integranteActual.email,
        telefono: (datos.telefono !== undefined) ? (datos.telefono ? datos.telefono.trim() : null) : integranteActual.telefono
    };

    return integrantesModel.actualizar(id, integranteModificado);
}

function eliminar(id) {
    return integrantesModel.eliminar(id);
}

module.exports = {
    validar,
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
