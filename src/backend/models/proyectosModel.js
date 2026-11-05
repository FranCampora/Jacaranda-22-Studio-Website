const db = require('./db');

function obtenerTodos() {
    return db.prepare('SELECT * FROM proyectos ORDER BY id DESC').all();
}

function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) return undefined;

    return db.prepare('SELECT * FROM proyectos WHERE id = ?').get(n);
}

function crear(datos) {
    const stmt = db.prepare(`
        INSERT INTO proyectos (
            nombre, tipo, estado, fecha_inicio, fecha_fin_estimada,
            fecha_fin, genero, descripcion, precio_por_hora, cantidad_horas
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);//evita inyeccion sql, pone valores default y depues los posta

    const info = stmt.run(
        datos.nombre,
        datos.tipo,
        datos.estado,
        datos.fecha_inicio,
        datos.fecha_fin_estimada || null,
        datos.fecha_fin || null,
        datos.genero || null,
        datos.descripcion || null,
        Number(datos.precio_por_hora || 0),
        Number(datos.cantidad_horas || 0)
    );

    return obtenerPorId(Number(info.lastInsertRowid));
}

function actualizar(id, datos) {
    const n = Number(id);
    if (!Number.isInteger(n)) return undefined;

    const stmt = db.prepare(`
        UPDATE proyectos
        SET nombre = ?, tipo = ?, estado = ?, fecha_inicio = ?,
            fecha_fin_estimada = ?, fecha_fin = ?, genero = ?,
            descripcion = ?, precio_por_hora = ?, cantidad_horas = ?
        WHERE id = ?
    `);

    const info = stmt.run(
        datos.nombre,
        datos.tipo,
        datos.estado,
        datos.fecha_inicio,
        datos.fecha_fin_estimada || null,
        datos.fecha_fin || null,
        datos.genero || null,
        datos.descripcion || null,
        Number(datos.precio_por_hora || 0),
        Number(datos.cantidad_horas || 0),
        n
    );

    if (info.changes === 0) return undefined;
    return obtenerPorId(n);
}

function eliminar(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) return false;

    const info = db.prepare('DELETE FROM proyectos WHERE id = ?').run(n);
    return info.changes > 0;
}

// Consultas para reportes
function contarPorEstado() {
    const proyectos = db.prepare('SELECT estado FROM proyectos').all();
    const conteo = {};

    for (const p of proyectos) {
        const estado = (p.estado || 'sin estado').trim().toLowerCase();
        conteo[estado] = (conteo[estado] || 0) + 1;
    }

    return Object.entries(conteo)
        .map(([estado, cantidad]) => ({ estado, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad || a.estado.localeCompare(b.estado));
}

function normalizarGenero(genero) {
    if (!genero || typeof genero !== 'string') return 'Sin género';
    const g = genero.trim();
    if (!g) return 'Sin género';

    const lower = g.toLowerCase();

    // Trap y variantes como "Trap / R&B" se unifican en la categoría Trap
    if (lower === 'trap' || lower.startsWith('trap') || lower.includes('trap')) {
        return 'Trap';
    }

    // Capitalizar adecuadamente para unificar mayúsculas y minúsculas (ej: "rock" y "Rock" -> "Rock")
    return g.split(/\s+/).map(palabra => {
        if (!palabra) return '';
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    }).join(' ');
}

function contarPorGenero() {
    const proyectos = db.prepare('SELECT genero FROM proyectos').all();
    const conteo = {};

    for (const p of proyectos) {
        const genero = normalizarGenero(p.genero);
        conteo[genero] = (conteo[genero] || 0) + 1;
    }

    return Object.entries(conteo)
        .map(([genero, cantidad]) => ({ genero, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad || a.genero.localeCompare(b.genero));
}

function resumenFinanciero() {
    return db.prepare(`
        SELECT 
            COUNT(*) AS total_proyectos,
            ROUND(SUM(cantidad_horas), 2) AS total_horas,
            ROUND(SUM(precio_por_hora * cantidad_horas), 2) AS facturacion_estimada,
            ROUND(AVG(precio_por_hora), 2) AS promedio_precio_hora
        FROM proyectos
    `).get();
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    contarPorEstado,
    contarPorGenero,
    resumenFinanciero
};
