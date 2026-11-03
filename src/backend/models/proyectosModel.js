const db = require('./db');

function obtenerTodos() {
    return db.prepare('SELECT * FROM proyectos ORDER BY id').all();
}

// devuelve el proyecto, o undefined si no existe
function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return undefined;
    }
    return db.prepare('SELECT * FROM proyectos WHERE id = ?').get(n);
}

function crear(datos) {
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
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    contarPorEstado,
    contarPorGenero
};