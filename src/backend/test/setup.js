/**
 * =============================================================================
 * SETUP DE BASE DE DATOS PARA TESTS — Jacaranda 22 Studio
 * =============================================================================
 *
 * ¿QUÉ HACE ESTE ARCHIVO?
 * -----------------------
 * Redirige la base de datos a un archivo temporal en la carpeta del sistema
 * operativo (os.tmpdir()) en lugar de usar "data/jacaranda.db" (el archivo real).
 * Esto garantiza que cada ejecución de tests:
 *   1. Arranca con una DB limpia y vacía (sin datos reales).
 *   2. No modifica ni ensucia la base de datos de desarrollo/producción.
 *   3. Es determinista: el mismo test siempre produce el mismo resultado.
 *
 * ¿POR QUÉ UN ARCHIVO TEMPORAL Y NO ":memory:"?
 * -----------------------------------------------
 * El proyecto usa "node:sqlite" (módulo nativo de Node.js 22+), no "better-sqlite3".
 * Jest corre en un entorno CommonJS donde los módulos se cachean en require().
 * Usar ":memory:" con node:sqlite en este contexto no garantiza aislamiento
 * entre suites, ya que el módulo db.js se requiere UNA SOLA VEZ y se reutiliza.
 * Un archivo en /tmp con nombre único por proceso de Jest sí logra el aislamiento.
 *
 * ¿CÓMO VOLVER AL COMPORTAMIENTO ORIGINAL (sin tests)?
 * -----------------------------------------------------
 * Este archivo SOLO se ejecuta cuando Jest lo llama como globalSetup.
 * En modo normal (npm start, npm run dev) este archivo NO se ejecuta.
 * Para volver a usar jacaranda.db simplemente no correr tests:
 *   - Producción / desarrollo: "npm start" o "npm run dev" → usa DB real.
 *   - Tests:                   "npm test"                  → usa DB temporal.
 *
 * Si en el futuro se quiere usar :memory: (por ejemplo migrando a better-sqlite3),
 * reemplazar la línea de DB_PATH por:
 *   process.env.DB_PATH = ':memory:';
 * y actualizar db.js para usar better-sqlite3 en lugar de node:sqlite.
 * =============================================================================
 */

const os = require('os');
const path = require('path');

// Genera un nombre de archivo único por ejecución de Jest (usando el PID del proceso)
// Ej: /tmp/jacaranda_test_12345.db
const DB_TEST_PATH = path.join(os.tmpdir(), `jacaranda_test_${process.pid}.db`);

// Setea la variable de entorno ANTES de que cualquier módulo requiera db.js
// db.js ya lee esta variable: process.env.DB_PATH || path.join(..., 'jacaranda.db')
process.env.DB_PATH = DB_TEST_PATH;
process.env.NODE_ENV = 'test';

module.exports = DB_TEST_PATH;
