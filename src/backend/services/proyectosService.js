const proyectosModel = require('../models/proyectosModel');
const proyectoIntegrantesModel = require('../models/proyectoIntegrantesModel');
const integrantesModel = require('../models/integrantesModel');



const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}$/;//Año, mes, dia. Valida.

//Se implementa logica, validadicones y reglas
//Checke todos los errores posibles y los junta en el array errores. 
// Si hay errores, devuelve un 400 con los errores y corta la ejecucion de la funcion. Si no hay errores, continua con la creacion del proyecto
function validar(body, esActualizacion = false) {
    const errores = [];

    if (!esActualizacion || body.nombre !== undefined) {
        if (!body.nombre || typeof body.nombre !== 'string' || body.nombre.trim() === '') {
            errores.push('El campo "nombre" es obligatorio y debe ser una cadena no vacía.');
        }
    }

    if (!esActualizacion || body.tipo !== undefined) {
        if (!body.tipo || typeof body.tipo !== "string" || body.tipo.trim() === "") {
            errores.push('El campo "tipo" es obligatorio y debe ser una cadena no vacía.');
        }
    }

    if (!esActualizacion || body.estado !== undefined) {
        if (!body.estado || typeof body.estado !== "string" || body.estado.trim() === "") {
            errores.push('El campo "estado" es obligatorio y debe ser una cadena no vacía.');
        }
    }

    if (!esActualizacion || body.fecha_inicio !== undefined) {
        if (!body.fecha_inicio || !REGEX_FECHA.test(body.fecha_inicio)) {
            errores.push('El campo "fecha_inicio" es obligatorio y debe tener formato YYYY-MM-DD.');
        }
    }

    if (body.fecha_fin_estimada && !REGEX_FECHA.test(body.fecha_fin_estimada)) {
        errores.push('El campo "fecha_fin_estimada" debe tener formato YYYY-MM-DD.');
    }

    if (body.fecha_fin && !REGEX_FECHA.test(body.fecha_fin)) {
        errores.push('El campo "fecha_fin" debe tener formato YYYY-MM-DD.');
    }

    if (body.fecha_inicio && body.fecha_fin && body.fecha_fin < body.fecha_inicio) {
        errores.push('La "fecha_fin" no puede ser anterior a la "fecha_inicio".');
    }

    if (body.precio_por_hora !== undefined) {
        const p = Number(body.precio_por_hora);
        if (Number.isNaN(p) || p < 0) {
            errores.push('El campo "precio_por_hora" debe ser un número mayor o igual a 0.');
        }
    }

    if (body.cantidad_horas !== undefined) {
        const h = Number(body.cantidad_horas);
        if (Number.isNaN(h) || h < 0) {
            errores.push('El campo "cantidad_horas" debe ser un número mayor o igual a 0.');
        }
    }

    return errores;//tiene todos los errores q saltaron, sino queda vacio
}

function obtenerTodos() {
    return proyectosModel.obtenerTodos();//se conecta con el model (osea la bbdd)
}

function obtenerPorId(id) {
    const proyecto = proyectosModel.obtenerPorId(id);
    if (!proyecto) return null;

    const integrantes = proyectoIntegrantesModel.obtenerIntegrantesDeProyecto(proyecto.id);

    // Retorno campo por campo
    return {
        id: proyecto.id,
        nombre: proyecto.nombre,
        tipo: proyecto.tipo,
        estado: proyecto.estado,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin_estimada: proyecto.fecha_fin_estimada,
        fecha_fin: proyecto.fecha_fin,
        genero: proyecto.genero,
        descripcion: proyecto.descripcion,
        precio_por_hora: proyecto.precio_por_hora,
        cantidad_horas: proyecto.cantidad_horas,
        integrantes: integrantes
    };
}

function crear(datos) {
    const nuevoProyecto = {
        nombre: datos.nombre.trim(),
        tipo: datos.tipo,
        estado: datos.estado,
        fecha_inicio: datos.fecha_inicio,
        fecha_fin_estimada: datos.fecha_fin_estimada ? datos.fecha_fin_estimada : null,
        fecha_fin: datos.fecha_fin ? datos.fecha_fin : null,
        genero: datos.genero ? datos.genero.trim() : null,
        descripcion: datos.descripcion ? datos.descripcion.trim() : null,
        precio_por_hora: Number(datos.precio_por_hora || 0),
        cantidad_horas: Number(datos.cantidad_horas || 0)
    };

    return proyectosModel.crear(nuevoProyecto);//le paso el objeto del proyecto con todos los datos
}

function actualizar(id, datos) {
    const actual = proyectosModel.obtenerPorId(id);
    if (!actual) return null;

    // reemplaza los datos modificados y deja a los existentes
    const proyectoActualizado = {
        nombre: datos.nombre ? datos.nombre.trim() : actual.nombre,
        tipo: datos.tipo ? datos.tipo : actual.tipo,
        estado: datos.estado ? datos.estado : actual.estado,
        fecha_inicio: datos.fecha_inicio ? datos.fecha_inicio : actual.fecha_inicio,
        fecha_fin_estimada: datos.fecha_fin_estimada !== undefined ? datos.fecha_fin_estimada : actual.fecha_fin_estimada,
        fecha_fin: datos.fecha_fin !== undefined ? datos.fecha_fin : actual.fecha_fin,
        genero: datos.genero !== undefined ? datos.genero : actual.genero,
        descripcion: datos.descripcion !== undefined ? datos.descripcion : actual.descripcion,
        precio_por_hora: datos.precio_por_hora !== undefined ? Number(datos.precio_por_hora) : actual.precio_por_hora,
        cantidad_horas: datos.cantidad_horas !== undefined ? Number(datos.cantidad_horas) : actual.cantidad_horas
    };

    return proyectosModel.actualizar(id, proyectoActualizado);
}

function eliminar(id) {
    return proyectosModel.eliminar(id);
}

// Gestión de la relación con integrantes
function obtenerIntegrantes(proyectoId) {
    const proyecto = proyectosModel.obtenerPorId(proyectoId);
    if (!proyecto) return null;
    return proyectoIntegrantesModel.obtenerIntegrantesDeProyecto(proyectoId);
}

function asignarIntegrante(proyectoId, integranteId, rolEnProyecto) {
    const proyecto = proyectosModel.obtenerPorId(proyectoId);
    if (!proyecto) {
        return { error: 'NOT_FOUND_PROYECTO' };
    }
    const integrante = integrantesModel.obtenerPorId(integranteId);
    if (!integrante) {
        return { error: 'NOT_FOUND_INTEGRANTE' };
    }

    proyectoIntegrantesModel.asignarIntegrante(proyectoId, integranteId, rolEnProyecto);
    return { exito: true };
}

function desvincularIntegrante(proyectoId, integranteId) {
    const proyecto = proyectosModel.obtenerPorId(proyectoId);
    if (!proyecto) {
        return { error: 'NOT_FOUND_PROYECTO' };
    }
    const existe = proyectoIntegrantesModel.existeRelacion(proyectoId, integranteId);
    if (!existe) {
        return { error: 'NOT_FOUND_RELACION' };
    }

    proyectoIntegrantesModel.desvincularIntegrante(proyectoId, integranteId);
    return { exito: true };
}

module.exports = {
    validar,
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerIntegrantes,
    asignarIntegrante,
    desvincularIntegrante
};

