/*por ahora hay datos const para evitar uso de BBDD y seguir laburando la funcionalidad*/
const ESTADOS = ['Activo', 'Inactivo', 'Pendiente', 'Completado', 'Cancelado', 'En progreso'];

let proyectos = [
    {
        id: 1,
        nombres_artistas: 'Artista 1',
        nombre_cancion: 'Canción 1',
        nombre_album: 'Álbum 1',
        fecha_inicio: '2026-01-01',
        fecha_fin: '2026-01-31',
        estado: 'Activo',
        descripcion: 'Descripción del proyecto 1',
        genero: 'Rap',
        subgenero: 'Boombap'
    }
];
let nextId = 2;

// ---- Validación simple ----
function datosValidos(body) {
    return (
        body &&
        body.nombres_artistas &&
        body.nombre_cancion &&
        body.fecha_inicio &&
        ESTADOS.includes(body.estado)
    );
}

function armarProyecto(id, body) {
    return {
        id,
        nombres_artistas: body.nombres_artistas,
        nombre_cancion: body.nombre_cancion,
        nombre_album: body.nombre_album ?? null,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin ?? null,
        estado: body.estado,
        descripcion: body.descripcion ?? ''
    };
}

// ---- Operaciones ----
function obtenerTodos() {
    return proyectos;
}

function obtenerPorId(id) {
    return proyectos.find(p => p.id === Number(id));
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
    datosValidos,
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};