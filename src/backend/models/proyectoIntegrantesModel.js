const db = require('./db');

function obtenerIntegrantesDeProyecto(proyectoId) {
    const pId = Number(proyectoId);
    if (!Number.isInteger(pId)) return [];

    const stmt = db.prepare(`
        SELECT i.id, i.nombre, i.rol, i.email, i.telefono, pi.rol_en_proyecto
        FROM proyecto_integrantes pi
        INNER JOIN integrantes i ON pi.integrante_id = i.id
        WHERE pi.proyecto_id = ?
        ORDER BY i.nombre
    `);
    return stmt.all(pId);
}

function obtenerProyectosDeIntegrante(integranteId) {
    const iId = Number(integranteId);
    if (!Number.isInteger(iId)) return [];

    const stmt = db.prepare(`
        SELECT p.*, pi.rol_en_proyecto
        FROM proyecto_integrantes pi
        INNER JOIN proyectos p ON pi.proyecto_id = p.id
        WHERE pi.integrante_id = ?
        ORDER BY p.nombre
    `);
    return stmt.all(iId);
}

function asignarIntegrante(proyectoId, integranteId, rolEnProyecto = null) {
    const pId = Number(proyectoId);
    const iId = Number(integranteId);
    if (!Number.isInteger(pId) || !Number.isInteger(iId)) return false;

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO proyecto_integrantes (proyecto_id, integrante_id, rol_en_proyecto)
        VALUES (?, ?, ?)
    `);
    const info = stmt.run(pId, iId, rolEnProyecto);
    return info.changes > 0;
}

function desvincularIntegrante(proyectoId, integranteId) {
    const pId = Number(proyectoId);
    const iId = Number(integranteId);
    if (!Number.isInteger(pId) || !Number.isInteger(iId)) return false;

    const stmt = db.prepare(`
        DELETE FROM proyecto_integrantes
        WHERE proyecto_id = ? AND integrante_id = ?
    `);
    const info = stmt.run(pId, iId);
    return info.changes > 0;
}

function existeRelacion(proyectoId, integranteId) {
    const pId = Number(proyectoId);
    const iId = Number(integranteId);
    if (!Number.isInteger(pId) || !Number.isInteger(iId)) return false;

    const row = db.prepare(`
        SELECT 1 FROM proyecto_integrantes WHERE proyecto_id = ? AND integrante_id = ?
    `).get(pId, iId);
    return Boolean(row);
}

module.exports = {
    obtenerIntegrantesDeProyecto,
    obtenerProyectosDeIntegrante,
    asignarIntegrante,
    desvincularIntegrante,
    existeRelacion
};
