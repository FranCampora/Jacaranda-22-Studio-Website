const db = require('./db');

function obtenerTodos() {
    return db.prepare('SELECT * FROM integrantes ORDER BY id').all();
}

// devuelve el integrante, o undefined si no existe
function obtenerPorId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return undefined;
    }
    return db.prepare('SELECT * FROM integrantes WHERE id = ?').get(n);
}

function crear(datos) {
    const info = db.prepare(`
        INSERT INTO integrantes (nombre, rol, email, telefono)
        VALUES (@nombre, @rol, @email, @telefono)
    `).run(datos);
    return obtenerPorId(info.lastInsertRowid);
}

// devuelve el integrante actualizado, o undefined si no existe
function actualizar(id, datos) {
    const n = Number(id);
    if (!Number.isInteger(n)) {
        return undefined;
    }
    const info = db.prepare(`
        UPDATE integrantes
        SET nombre = @nombre, rol = @rol, email = @email, telefono = @telefono
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
    return db.prepare('DELETE FROM integrantes WHERE id = ?').run(n).changes > 0;
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };