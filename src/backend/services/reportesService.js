const proyectosModel = require('../models/proyectosModel');

const TIPOS_REPORTE = ['estado', 'genero', 'financiero', 'general'];

function generar(tipo = 'general') {
    const t = String(tipo).toLowerCase();

    if (!TIPOS_REPORTE.includes(t)) {
        return null;
    }

    if (t === 'estado') {
        const datos = proyectosModel.contarPorEstado();
        const total = datos.reduce((acc, curr) => acc + curr.cantidad, 0);
        return {
            tipo: 'estado',
            titulo: 'Distribución de proyectos por estado',
            totalProyectos: total,
            datos
        };
    }

    if (t === 'genero') {
        const datos = proyectosModel.contarPorGenero();
        const total = datos.reduce((acc, curr) => acc + curr.cantidad, 0);
        return {
            tipo: 'genero',
            titulo: 'Distribución de proyectos por género musical',
            totalProyectos: total,
            datos
        };
    }

    if (t === 'financiero') {
        const resumen = proyectosModel.resumenFinanciero();
        return {
            tipo: 'financiero',
            titulo: 'Reporte económico y de carga horaria',
            datos: resumen
        };
    }

    // Reporte general
    const estados = proyectosModel.contarPorEstado();
    const generos = proyectosModel.contarPorGenero();
    const finanzas = proyectosModel.resumenFinanciero();

    return {
        tipo: 'general',
        titulo: 'Reporte ejecutivo del estudio Jacaranda 22',
        fechaGeneracion: new Date().toISOString(),
        finanzas,
        distribucionEstados: estados,
        distribucionGeneros: generos
    };
}

module.exports = {
    TIPOS_REPORTE,
    generar
};
