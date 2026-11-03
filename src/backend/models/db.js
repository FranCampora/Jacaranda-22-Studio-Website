const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// la ruta se puede cambiar con la variable de entorno DB_PATH (útil para Docker)
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'jacaranda.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

// ---- Tablas ----
db.exec(`
    CREATE TABLE IF NOT EXISTS proyectos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,
        estado TEXT NOT NULL,
        fecha_inicio TEXT NOT NULL,
        fecha_fin_estimada TEXT,
        fecha_fin TEXT,
        genero TEXT,
        descripcion TEXT
    );

    CREATE TABLE IF NOT EXISTS integrantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        rol TEXT NOT NULL,
        email TEXT,
        telefono TEXT
    );
`);

// ---- Datos de prueba (solo si las tablas están vacías) ----
const insertarProyecto = db.prepare(`
    INSERT INTO proyectos (nombre, tipo, estado, fecha_inicio, fecha_fin_estimada, fecha_fin, genero, descripcion)
    VALUES (@nombre, @tipo, @estado, @fecha_inicio, @fecha_fin_estimada, @fecha_fin, @genero, @descripcion)
`);

const insertarIntegrante = db.prepare(`
    INSERT INTO integrantes (nombre, rol, email, telefono)
    VALUES (@nombre, @rol, @email, @telefono)
`);

const cargarDatosDePrueba = db.transaction(() => {
    const proyectos = [
        { nombre: 'Proyecto 1', tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-05', fecha_fin_estimada: '2026-02-10', fecha_fin: null, genero: 'Rap', descripcion: 'Single de prueba 1' },
        { nombre: 'Proyecto 2', tipo: 'disco', estado: 'grabacion', fecha_inicio: '2026-01-15', fecha_fin_estimada: '2026-06-30', fecha_fin: null, genero: 'Trap', descripcion: 'Disco de prueba' },
        { nombre: 'Proyecto 3', tipo: 'EP', estado: 'maqueta', fecha_inicio: '2026-02-01', fecha_fin_estimada: '2026-04-15', fecha_fin: null, genero: 'Rock', descripcion: 'EP de prueba' },
        { nombre: 'Proyecto 4', tipo: 'beat', estado: 'listo', fecha_inicio: '2026-02-20', fecha_fin_estimada: '2026-03-01', fecha_fin: '2026-02-28', genero: 'Rap', descripcion: 'Beat terminado' },
        { nombre: 'Proyecto 5', tipo: 'prueba', estado: 'mezcla', fecha_inicio: '2026-03-10', fecha_fin_estimada: '2026-03-25', fecha_fin: null, genero: 'Pop', descripcion: 'Prueba de mezcla' },
        { nombre: 'Proyecto 6', tipo: 'single', estado: 'grabacion', fecha_inicio: '2026-03-18', fecha_fin_estimada: '2026-05-01', fecha_fin: null, genero: 'Trap', descripcion: 'Single de prueba 2' }
    ];

    const integrantes = [
        { nombre: 'Integrante 1', rol: 'artista', email: 'integrante1@jacaranda22.com', telefono: '1100000001' },
        { nombre: 'Integrante 2', rol: 'productor', email: 'integrante2@jacaranda22.com', telefono: '1100000002' },
        { nombre: 'Integrante 3', rol: 'feat', email: 'integrante3@jacaranda22.com', telefono: '1100000003' },
        { nombre: 'Integrante 4', rol: 'banda', email: 'integrante4@jacaranda22.com', telefono: '1100000004' },
        { nombre: 'Integrante 5', rol: 'sesionista', email: 'integrante5@jacaranda22.com', telefono: '1100000005' }
    ];

    proyectos.forEach(p => insertarProyecto.run(p));
    integrantes.forEach(i => insertarIntegrante.run(i));
});

const hayProyectos = db.prepare('SELECT COUNT(*) AS total FROM proyectos').get().total;
if (hayProyectos === 0) {
    cargarDatosDePrueba();
}

module.exports = db;