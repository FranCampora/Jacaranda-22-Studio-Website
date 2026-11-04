// ============================================================================
// Servicio: Reportes
// Este módulo centraliza las consultas de reportes derivados de los datos.
// ============================================================================

const BASE_URL = 'http://localhost:3000/api/v1/reportes';

// GET /api/v1/reportes?tipo=general|financiero|estado|genero
// Recupera el reporte estadístico/financiero según el parámetro especificado.
async function obtenerPorTipo(tipo = 'general') {
    const respuesta = await fetch(`${BASE_URL}?tipo=${tipo}`);
    if (!respuesta.ok) {
        throw new Error(`Error al obtener reporte de tipo: ${tipo}`);
    }
    return await respuesta.json();
}

export const reportesService = {
    obtenerPorTipo
};
