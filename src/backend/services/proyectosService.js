const proyectosModel = require('../models/proyectosModel');

const TIPOS = ['disco', 'single', 'EP', 'prueba', 'beat'];
const ESTADOS = ['nuevo', 'grabacion', 'maqueta', 'listo', 'mezcla'];

// devuelve una lista de errores (vacía si todo está bien)
function validar(body) {
    const errores = [];
    if (!body.nombre || typeof body.nombre !== 'string') {
        errores.push('nombre es obligatorio');
    }
    if (!TIPOS.includes(body.tipo)) {
        errores.push(`tipo debe ser uno de: ${TIPOS.join(', ')}`);
    }
    // ... estado y fechas (YYYY-MM-DD)
    return errores;
}

function obtenerTodos() {
    return proyectosModel.obtenerTodos();
}

function obtenerPorId(id) {
    return proyectosModel.obtenerPorId(Number(id));
}

function crear(body) {
    const nuevoProyecto = armarProyecto(nextId++, body);
    proyectos.push(nuevoProyecto);
    return nuevoProyecto;
}

// devuelve el proyecto actualizado, o undefined si no existe
function actualizar(id, body) {
    const indice = proyectos.findIndex(p => p.id === Number(id));
    if (indice === -1) {
        return undefined;
    }
    proyectos[indice] = armarProyecto(Number(id), body);
    return proyectos[indice];
}

// devuelve true si lo borró, false si no existía
function eliminar(id) {
    const indice = proyectos.findIndex(p => p.id === Number(id));
    if (indice === -1) {
        return false;
    }
    proyectos.splice(indice, 1);
    return true;
}

module.exports = {
    ESTADOS,
    TIPOS,
    validar,
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};