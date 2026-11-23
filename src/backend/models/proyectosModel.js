const db = require('./db');

function obtenerTodos() {
<<<<<<< HEAD
    return db.prepare('SELECT * FROM proyectos ORDER BY id DESC').all();
}

function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) return undefined;

=======
    return db.prepare('SELECT * FROM proyectos ORDER BY id').all();
}

// devuelve el proyecto, o undefined si no existe
function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return undefined;
    }
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
    return db.prepare('SELECT * FROM proyectos WHERE id = ?').get(n);
}

function crear(datos) {
<<<<<<< HEAD
    const stmt = db.prepare(`
        INSERT INTO proyectos (
            nombre, tipo, estado, fecha_inicio, fecha_fin_estimada,
            fecha_fin, genero, descripcion, precio_por_hora, cantidad_horas
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `); //evita inyeccion sql, pone valores default y depues los posta

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
=======
    const info = db.prepare(`
        INSERT INTO proyectos (nombre, tipo, estado, fecha_inicio, fecha_fin_estimada, fecha_fin, genero, descripcion)
        VALUES (@nombre, @tipo, @estado, @fecha_inicio, @fecha_fin_estimada, @fecha_fin, @genero, @descripcion)
    `).run(datos);
    return obtenerPorId(info.lastInsertRowid);
}

// devuelve el proyecto actualizado, o undefined si no existe
function actualizar(id, datos) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return undefined;
    }
    const info = db.prepare(`
        UPDATE proyectos
        SET nombre = @nombre, tipo = @tipo, estado = @estado, fecha_inicio = @fecha_inicio,
            fecha_fin_estimada = @fecha_fin_estimada, fecha_fin = @fecha_fin,
            genero = @genero, descripcion = @descripcion
        WHERE id = @id
    `).run({ ...datos, id: n });
    if (info.changes === 0) {
        return undefined;
    }
    return obtenerPorId(n);
}

// devuelve true si lo borró, false si no existía
function eliminar(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return false;
    }
    return db.prepare('DELETE FROM proyectos WHERE id = ?').run(n).changes > 0;
}

// ---- Para los reportes ----
function contarPorEstado() {
    return db.prepare('SELECT estado, COUNT(*) AS cantidad FROM proyectos GROUP BY estado').all();
}

function contarPorGenero() {
    return db.prepare(`
        SELECT COALESCE(genero, 'sin_genero') AS genero, COUNT(*) AS cantidad
        FROM proyectos
        GROUP BY COALESCE(genero, 'sin_genero')
        ORDER BY cantidad DESC, genero
    `).all();
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    contarPorEstado,
<<<<<<< HEAD
    contarPorGenero,
    resumenFinanciero
};
=======
    contarPorGenero
};
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
