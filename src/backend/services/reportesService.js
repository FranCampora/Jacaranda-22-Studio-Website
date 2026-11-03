const proyectosService = require('./proyectosService');

// para saber cuantos proyectos hay en cada estado
const TIPOS_REPORTE = ['estado', 'genero'];

// devuelve el reporte, o undefined si el tipo no es válido
function generarProyecto(tipo) {
    // 'estado' -> cuenta por estado (siempre salen los 5, aunque tengan 0)
    // 'genero' -> cuenta por género
    return { tipo, total, datos };
}

module.exports = { generarProyecto };