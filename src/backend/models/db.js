<<<<<<< HEAD
const { DatabaseSync } = require('node:sqlite');/*uso sqlite que ya viene en node. databasessync abre la bbdd*/
const path = require('path');
const fs = require('fs');/*modulo de file de node*/

// Ruta de la base de datos (configurable por variable de entorno para Docker)
/*

primero intenta leer la variabe DB_PATH, si no existe sube la carpeta y entra a jacaranda.db dentro de la carpeta data

*/
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'jacaranda.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);//abre la conexion con la bbdd y crea la var db

db.exec('PRAGMA foreign_keys = ON;');//habilita la fk porque daba problemas

// Si no hay tablas, crearlas
=======
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// la ruta se puede cambiar con la variable de entorno DB_PATH (útil para Docker)
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'jacaranda.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);

// ---- Tablas ----
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
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
<<<<<<< HEAD
        descripcion TEXT,
        precio_por_hora REAL NOT NULL DEFAULT 0,
        cantidad_horas REAL NOT NULL DEFAULT 0
=======
        descripcion TEXT
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
    );

    CREATE TABLE IF NOT EXISTS integrantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        rol TEXT NOT NULL,
        email TEXT,
        telefono TEXT
    );
<<<<<<< HEAD

    CREATE TABLE IF NOT EXISTS proyecto_integrantes (
        proyecto_id INTEGER NOT NULL,
        integrante_id INTEGER NOT NULL,
        rol_en_proyecto TEXT,
        PRIMARY KEY (proyecto_id, integrante_id),
        FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
        FOREIGN KEY (integrante_id) REFERENCES integrantes(id) ON DELETE CASCADE
    );
`);


//datos de prueba
function sembrarDatosIniciales() {
    const countProyectos = db.prepare('SELECT COUNT(*) AS total FROM proyectos').get().total;

    if (countProyectos === 0) {
        const insertarProyecto = db.prepare(`
            INSERT INTO proyectos (nombre, tipo, estado, fecha_inicio, fecha_fin_estimada, fecha_fin, genero, descripcion, precio_por_hora, cantidad_horas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const proyectosSeed = [
            ['Proyecto 1', 'single', 'nuevo', '2026-01-05', '2026-02-10', null, 'Rap', 'Single de prueba 1', 2500, 10],
            ['Proyecto 2', 'disco', 'grabacion', '2026-01-15', '2026-06-30', null, 'Trap', 'Disco de prueba', 3200, 45],
            ['Proyecto 3', 'EP', 'maqueta', '2026-02-01', '2026-04-15', null, 'Rock', 'EP de prueba', 2800, 20],
            ['Proyecto 4', 'beat', 'listo', '2026-02-20', '2026-03-01', '2026-02-28', 'Rap', 'Beat terminado prueba', 2000, 8],
            ['Proyecto 5', 'prueba', 'mezcla', '2026-03-10', '2026-03-25', null, 'Pop', 'Prueba de mezcla', 2500, 15],
            ['Proyecto 6', 'single', 'grabacion', '2026-03-18', '2026-05-01', null, 'Trap', 'Single de prueba 2', 3000, 12]
        ];

        proyectosSeed.forEach(p => insertarProyecto.run(...p));
    }

    const countIntegrantes = db.prepare('SELECT COUNT(*) AS total FROM integrantes').get().total;
    if (countIntegrantes === 0) {
        const insertarIntegrante = db.prepare(`
            INSERT INTO integrantes (nombre, rol, email, telefono)
            VALUES (?, ?, ?, ?)
        `);

        const integrantesSeed = [
            ['Lucas Rodríguez', 'artista', 'lucas@jacaranda22.com', '1100000001'],
            ['Martín Gómez', 'productor', 'martin@jacaranda22.com', '1100000002'],
            ['Sofía Morales', 'feat', 'sofia@jacaranda22.com', '1100000003'],
            ['Banda Los Robles', 'banda', 'contacto@losrobles.com', '1100000004'],
            ['Joaquín Sánchez', 'sesionista', 'joaquin@jacaranda22.com', '1100000005']
        ];

        integrantesSeed.forEach(i => insertarIntegrante.run(...i));
    }

    // Sembrar relaciones si la tabla intermedia está vacía
    const countRelaciones = db.prepare('SELECT COUNT(*) AS total FROM proyecto_integrantes').get().total;
    if (countRelaciones === 0) {
        const insertarRelacion = db.prepare(`
            INSERT OR IGNORE INTO proyecto_integrantes (proyecto_id, integrante_id, rol_en_proyecto)
            VALUES (?, ?, ?)
        `);

        const relacionesSeed = [
            [1, 1, 'Voz principal'],
            [1, 2, 'Productor musical'],
            [2, 2, 'Productor musical'],
            [2, 3, 'Colaboración feat'],
            [3, 4, 'Banda invitada'],
            [3, 5, 'Bajo de sesión'],
            [4, 2, 'Beatmaker'],
            [5, 5, 'Guitarras']
        ];

        relacionesSeed.forEach(r => insertarRelacion.run(...r));
    }
}

sembrarDatosIniciales();

module.exports = db;
=======
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
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
