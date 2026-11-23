/**
 * =============================================================================
 * TESTS DE INTEGRACIÓN + UNITARIOS — Proyectos (/api/v2/proyectos)
 * =============================================================================
 *
 * Tests de integración: usan supertest para hacer requests HTTP reales contra
 * la app Express en memoria. Verifican el flujo completo: ruta → controller →
 * service → model → DB temporal.
 *
 * Tests unitarios: importan el service directamente y llaman a sus funciones
 * sin pasar por HTTP. Verifican la lógica de negocio y validaciones en
 * aislamiento.
 *
 * La DB usada es un archivo temporal en os.tmpdir() (ver setup.js).
 * No se toca data/jacaranda.db en ningún momento.
 * =============================================================================
 */

require('./setup');               // Redirige DB a archivo temporal antes de importar la app
const request = require('supertest');
const app = require('../server');
const proyectosService = require('../services/proyectosService');

// ─────────────────────────────────────────────────────────────────────────────
// TESTS UNITARIOS — proyectosService.validar()
// ─────────────────────────────────────────────────────────────────────────────
describe('[Unitario] proyectosService.validar()', () => {

    test('Sin errores con todos los campos obligatorios presentes', () => {
        const errores = proyectosService.validar({
            nombre: 'Mi Proyecto',
            tipo: 'single',
            estado: 'nuevo',
            fecha_inicio: '2026-01-01'
        });
        expect(errores).toHaveLength(0);
    });

    test('Error si falta "nombre"', () => {
        const errores = proyectosService.validar({ tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01' });
        expect(errores.some(e => e.includes('"nombre"'))).toBe(true);
    });

    test('Error si falta "tipo"', () => {
        const errores = proyectosService.validar({ nombre: 'Test', estado: 'nuevo', fecha_inicio: '2026-01-01' });
        expect(errores.some(e => e.includes('"tipo"'))).toBe(true);
    });

    test('Error si falta "estado"', () => {
        const errores = proyectosService.validar({ nombre: 'Test', tipo: 'single', fecha_inicio: '2026-01-01' });
        expect(errores.some(e => e.includes('"estado"'))).toBe(true);
    });

    test('Error si "fecha_inicio" tiene formato inválido (no YYYY-MM-DD)', () => {
        const errores = proyectosService.validar({ nombre: 'Test', tipo: 'single', estado: 'nuevo', fecha_inicio: '01/01/2026' });
        expect(errores.some(e => e.includes('"fecha_inicio"'))).toBe(true);
    });

    test('Error si "fecha_fin" es anterior a "fecha_inicio"', () => {
        const errores = proyectosService.validar({
            nombre: 'Test', tipo: 'single', estado: 'nuevo',
            fecha_inicio: '2026-06-01', fecha_fin: '2026-01-01'
        });
        expect(errores.some(e => e.includes('fecha_fin'))).toBe(true);
    });

    test('Error si "precio_por_hora" es negativo', () => {
        const errores = proyectosService.validar({
            nombre: 'Test', tipo: 'single', estado: 'nuevo',
            fecha_inicio: '2026-01-01', precio_por_hora: -100
        });
        expect(errores.some(e => e.includes('"precio_por_hora"'))).toBe(true);
    });

    test('Error si "cantidad_horas" es negativa', () => {
        const errores = proyectosService.validar({
            nombre: 'Test', tipo: 'single', estado: 'nuevo',
            fecha_inicio: '2026-01-01', cantidad_horas: -5
        });
        expect(errores.some(e => e.includes('"cantidad_horas"'))).toBe(true);
    });

    test('En modo actualización (esActualizacion=true) no exige campos faltantes', () => {
        // Al hacer PUT, no es obligatorio enviar todos los campos
        const errores = proyectosService.validar({ estado: 'mezcla' }, true);
        expect(errores).toHaveLength(0);
    });

    test('En modo actualización, si se envía un campo con valor inválido, sí da error', () => {
        const errores = proyectosService.validar({ precio_por_hora: -1 }, true);
        expect(errores.length).toBeGreaterThan(0);
    });

    test('Acumula múltiples errores en el mismo array', () => {
        const errores = proyectosService.validar({});
        // Faltan nombre, tipo, estado y fecha_inicio → 4 errores
        expect(errores.length).toBeGreaterThanOrEqual(4);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE INTEGRACIÓN — /api/v2/proyectos
// ─────────────────────────────────────────────────────────────────────────────
describe('[Integración] GET /api/v2/proyectos', () => {

    test('Devuelve 200 y un array', async () => {
        const res = await request(app).get('/api/v2/proyectos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Cada proyecto tiene los campos esperados', async () => {
        const res = await request(app).get('/api/v2/proyectos');
        // La DB de test empieza vacía, solo verificamos si hay elementos que tengan la forma correcta
        if (res.body.length > 0) {
            const p = res.body[0];
            expect(p).toHaveProperty('id');
            expect(p).toHaveProperty('nombre');
            expect(p).toHaveProperty('tipo');
            expect(p).toHaveProperty('estado');
        }
    });
});

describe('[Integración] GET /api/v2/proyectos/:id', () => {

    test('Devuelve 404 con formato correcto para ID inexistente', async () => {
        const res = await request(app).get('/api/v2/proyectos/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Proyecto no encontrado');
    });

    test('Devuelve 200 y el proyecto con sus integrantes para un ID existente', async () => {
        // Primero creamos un proyecto para tener un ID válido
        const created = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Proyecto Test GET', tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01'
        });
        const id = created.body.id;
        const res = await request(app).get(`/api/v2/proyectos/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body).toHaveProperty('integrantes');
        expect(Array.isArray(res.body.integrantes)).toBe(true);
    });
});

describe('[Integración] POST /api/v2/proyectos', () => {

    test('Crea un proyecto con todos los campos y devuelve 201', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Álbum Nuevo',
            tipo: 'disco',
            estado: 'grabacion',
            fecha_inicio: '2026-03-01',
            fecha_fin_estimada: '2026-06-01',
            genero: 'Rock',
            descripcion: 'Primer disco',
            precio_por_hora: 3000,
            cantidad_horas: 20
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe('Álbum Nuevo');
        expect(res.body.tipo).toBe('disco');
    });

    test('Devuelve 400 si falta el campo "nombre"', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({
            tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('detalles');
        expect(Array.isArray(res.body.detalles)).toBe(true);
    });

    test('Devuelve 400 si "fecha_inicio" tiene formato incorrecto', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Test', tipo: 'single', estado: 'nuevo', fecha_inicio: '01-01-2026'
        });
        expect(res.statusCode).toBe(400);
    });

    test('Devuelve 400 si "precio_por_hora" es negativo', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Test', tipo: 'single', estado: 'nuevo',
            fecha_inicio: '2026-01-01', precio_por_hora: -500
        });
        expect(res.statusCode).toBe(400);
    });
});

describe('[Integración] PUT /api/v2/proyectos/:id', () => {

    test('Actualiza campos parcialmente y devuelve 200', async () => {
        const created = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Proyecto para actualizar', tipo: 'EP', estado: 'nuevo', fecha_inicio: '2026-02-01'
        });
        const id = created.body.id;
        const res = await request(app).put(`/api/v2/proyectos/${id}`).send({
            estado: 'mezcla', cantidad_horas: 50
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.estado).toBe('mezcla');
        expect(res.body.cantidad_horas).toBe(50);
        expect(res.body.nombre).toBe('Proyecto para actualizar'); // No cambió
    });

    test('Devuelve 404 para ID inexistente', async () => {
        const res = await request(app).put('/api/v2/proyectos/999999').send({ estado: 'listo' });
        expect(res.statusCode).toBe(404);
    });

    test('Devuelve 400 si el campo enviado es inválido', async () => {
        const created = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Proyecto PUT inválido', tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01'
        });
        const id = created.body.id;
        const res = await request(app).put(`/api/v2/proyectos/${id}`).send({ precio_por_hora: -999 });
        expect(res.statusCode).toBe(400);
    });
});

describe('[Integración] DELETE /api/v2/proyectos/:id', () => {

    test('Elimina un proyecto existente y devuelve 204', async () => {
        const created = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Proyecto a eliminar', tipo: 'beat', estado: 'nuevo', fecha_inicio: '2026-05-01'
        });
        const id = created.body.id;
        const res = await request(app).delete(`/api/v2/proyectos/${id}`);
        expect(res.statusCode).toBe(204);
    });

    test('Después de eliminar, GET por ese ID devuelve 404', async () => {
        const created = await request(app).post('/api/v2/proyectos').send({
            nombre: 'Proyecto eliminado verificación', tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-05-01'
        });
        const id = created.body.id;
        await request(app).delete(`/api/v2/proyectos/${id}`);
        const res = await request(app).get(`/api/v2/proyectos/${id}`);
        expect(res.statusCode).toBe(404);
    });

    test('Devuelve 404 para ID inexistente', async () => {
        const res = await request(app).delete('/api/v2/proyectos/999999');
        expect(res.statusCode).toBe(404);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE SEGURIDAD BÁSICA — /api/v2/proyectos
// ─────────────────────────────────────────────────────────────────────────────
describe('[Seguridad] /api/v2/proyectos', () => {

    test('Payload muy largo en nombre no rompe el servidor (devuelve 400 o 201)', async () => {
        const nombreLargo = 'A'.repeat(10000);
        const res = await request(app).post('/api/v2/proyectos').send({
            nombre: nombreLargo, tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01'
        });
        // El servidor no debe devolver 500. Acepta o rechaza, pero no se rompe.
        expect(res.statusCode).not.toBe(500);
    });

    test('Intento de SQL injection en el nombre no rompe el servidor', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({
            nombre: "'; DROP TABLE proyectos; --",
            tipo: 'single', estado: 'nuevo', fecha_inicio: '2026-01-01'
        });
        expect(res.statusCode).not.toBe(500);
        // La tabla debe seguir funcionando
        const lista = await request(app).get('/api/v2/proyectos');
        expect(lista.statusCode).toBe(200);
    });

    test('Body completamente vacío devuelve 400 y no 500', async () => {
        const res = await request(app).post('/api/v2/proyectos').send({});
        expect(res.statusCode).toBe(400);
    });

    test('ID con caracteres especiales devuelve 404 y no 500', async () => {
        const res = await request(app).get('/api/v2/proyectos/abc!@#');
        expect(res.statusCode).toBe(404);
    });
});
