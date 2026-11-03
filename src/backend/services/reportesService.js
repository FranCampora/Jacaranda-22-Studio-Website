const proyectosService = require('./proyectosService');

// para saber cuantos proyectos hay en cada estado
function proyectosPorEstado() {
    const proyectos = proyectosService.obtenerTodos();
    return proyectosService.ESTADOS.map(estado => ({
        estado,
        cantidad: proyectos.filter(p => p.estado === estado).length
    }));
}

module.exports = { proyectosPorEstado };