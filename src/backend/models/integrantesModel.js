const db = require('./db');

function obtenerTodos() {
    return db.prepare('SELECT * FROM integrantes ORDER BY id DESC').all();
}

function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) return undefined;

    return db.prepare('SELECT * FROM integrantes WHERE id = ?').get(n);
}

function crear(datos) {
    const stmt = db.prepare(`
        INSERT INTO integrantes (nombre, rol, email, telefono)
        VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(
        datos.nombre,
        datos.rol,
        datos.email || null,
        datos.telefono || null
    );

    return obtenerPorId(Number(info.lastInsertRowid));
}

function actualizar(id, datos) {
    const n = Number(id);
    if (!Number.isInteger(n)) return undefined;

    const stmt = db.prepare(`
        UPDATE integrantes
        SET nombre = ?, rol = ?, email = ?, telefono = ?
        WHERE id = ?
    `);

    const info = stmt.run(
        datos.nombre,
        datos.rol,
        datos.email || null,
        datos.telefono || null,
        n
    );

    if (info.changes === 0) return undefined;
    return obtenerPorId(n);
}

function eliminar(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) return false;

    const info = db.prepare('DELETE FROM integrantes WHERE id = ?').run(n);
    return info.changes > 0;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
