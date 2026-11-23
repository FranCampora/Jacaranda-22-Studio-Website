/**
 * =============================================================================
 * TESTS DE INTEGRACIÓN + UNITARIOS — Integrantes (/api/v1/integrantes)
 * =============================================================================
 *
 * Tests de integración: flujo completo HTTP con supertest.
 * Tests unitarios: lógica de validación del service en aislamiento.
 *
 * La DB usada es un archivo temporal en os.tmpdir() (ver setup.js).
 * No se toca data/jacaranda.db en ningún momento.
 * =============================================================================
 */

require('./setup');               // Redirige DB a archivo temporal antes de importar la app
const request = require('supertest');
const app = require('../server');
const integrantesService = require('../services/integrantesService');

// ─────────────────────────────────────────────────────────────────────────────
// TESTS UNITARIOS — integrantesService.validar()
// ─────────────────────────────────────────────────────────────────────────────
describe('[Unitario] integrantesService.validar()', () => {

    test('Sin errores con nombre y rol presentes', () => {
        const errores = integrantesService.validar({ nombre: 'Lucas', rol: 'artista' });
        expect(errores).toHaveLength(0);
    });

    test('Error si falta "nombre"', () => {
        const errores = integrantesService.validar({ rol: 'artista' });
        expect(errores.some(e => e.includes('"nombre"'))).toBe(true);
    });

    test('Error si falta "rol"', () => {
        const errores = integrantesService.validar({ nombre: 'Lucas' });
        expect(errores.some(e => e.includes('"rol"'))).toBe(true);
    });

    test('Error si "nombre" es una cadena vacía', () => {
        const errores = integrantesService.validar({ nombre: '   ', rol: 'artista' });
        expect(errores.some(e => e.includes('"nombre"'))).toBe(true);
    });

    test('Error si "email" tiene formato inválido', () => {
        const errores = integrantesService.validar({ nombre: 'Lucas', rol: 'artista', email: 'no-es-un-email' });
        expect(errores.some(e => e.includes('"email"'))).toBe(true);
    });

    test('Sin error si "email" tiene formato válido', () => {
        const errores = integrantesService.validar({ nombre: 'Lucas', rol: 'artista', email: 'lucas@jacaranda.com' });
        expect(errores).toHaveLength(0);
    });

    test('Sin error si "email" es undefined (es opcional)', () => {
        const errores = integrantesService.validar({ nombre: 'Lucas', rol: 'artista' });
        expect(errores).toHaveLength(0);
    });

    test('En modo actualización, no exige campos faltantes', () => {
        const errores = integrantesService.validar({ rol: 'productor' }, true);
        expect(errores).toHaveLength(0);
    });

    test('En modo actualización, sí valida el email si se envía', () => {
        const errores = integrantesService.validar({ email: 'invalido' }, true);
        expect(errores.some(e => e.includes('"email"'))).toBe(true);
    });

    test('Acumula múltiples errores', () => {
        const errores = integrantesService.validar({});
        expect(errores.length).toBeGreaterThanOrEqual(2); // nombre y rol
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE INTEGRACIÓN — /api/v1/integrantes
// ─────────────────────────────────────────────────────────────────────────────
describe('[Integración] GET /api/v1/integrantes', () => {

    test('Devuelve 200 y un array', async () => {
        const res = await request(app).get('/api/v1/integrantes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Cada integrante tiene los campos esperados', async () => {
        const res = await request(app).get('/api/v1/integrantes');
        if (res.body.length > 0) {
            const i = res.body[0];
            expect(i).toHaveProperty('id');
            expect(i).toHaveProperty('nombre');
            expect(i).toHaveProperty('rol');
        }
    });
});

describe('[Integración] GET /api/v1/integrantes/:id', () => {

    test('Devuelve 404 para un ID inexistente', async () => {
        const res = await request(app).get('/api/v1/integrantes/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Integrante no encontrado');
    });

    test('Devuelve 200 con el integrante y su lista de proyectos', async () => {
        const created = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Martina GET', rol: 'productora'
        });
        const id = created.body.id;
        const res = await request(app).get(`/api/v1/integrantes/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(id);
        expect(res.body).toHaveProperty('proyectos');
        expect(Array.isArray(res.body.proyectos)).toBe(true);
    });
});

describe('[Integración] POST /api/v1/integrantes', () => {

    test('Crea un integrante con todos los campos y devuelve 201', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Sofía Test',
            rol: 'sesionista',
            email: 'sofia@jacaranda.com',
            telefono: '1199887766'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe('Sofía Test');
        expect(res.body.rol).toBe('sesionista');
    });

    test('Crea un integrante solo con campos obligatorios (sin email ni teléfono)', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Solo Obligatorios', rol: 'artista'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBeNull();
        expect(res.body.telefono).toBeNull();
    });

    test('Devuelve 400 si falta "nombre"', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({ rol: 'artista' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('detalles');
    });

    test('Devuelve 400 si "email" tiene formato inválido', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Test Email', rol: 'artista', email: 'no-arroba'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.detalles.some(d => d.includes('"email"'))).toBe(true);
    });
});

describe('[Integración] PUT /api/v1/integrantes/:id', () => {

    test('Actualiza campos parcialmente y devuelve 200', async () => {
        const created = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Integrante para actualizar', rol: 'artista'
        });
        const id = created.body.id;
        const res = await request(app).put(`/api/v1/integrantes/${id}`).send({
            rol: 'productor general', telefono: '1100000099'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.rol).toBe('productor general');
        expect(res.body.telefono).toBe('1100000099');
        expect(res.body.nombre).toBe('Integrante para actualizar'); // No cambió
    });

    test('Devuelve 404 para ID inexistente', async () => {
        const res = await request(app).put('/api/v1/integrantes/999999').send({ rol: 'nuevo rol' });
        expect(res.statusCode).toBe(404);
    });

    test('Devuelve 400 si el email enviado en la actualización es inválido', async () => {
        const created = await request(app).post('/api/v1/integrantes').send({
            nombre: 'PUT Email Test', rol: 'artista'
        });
        const id = created.body.id;
        const res = await request(app).put(`/api/v1/integrantes/${id}`).send({ email: 'mail-invalido' });
        expect(res.statusCode).toBe(400);
    });
});

describe('[Integración] DELETE /api/v1/integrantes/:id', () => {

    test('Elimina un integrante existente y devuelve 204', async () => {
        const created = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Integrante a eliminar', rol: 'feat'
        });
        const id = created.body.id;
        const res = await request(app).delete(`/api/v1/integrantes/${id}`);
        expect(res.statusCode).toBe(204);
    });

    test('Después de eliminar, GET por ese ID devuelve 404', async () => {
        const created = await request(app).post('/api/v1/integrantes').send({
            nombre: 'Verificar eliminación', rol: 'banda'
        });
        const id = created.body.id;
        await request(app).delete(`/api/v1/integrantes/${id}`);
        const res = await request(app).get(`/api/v1/integrantes/${id}`);
        expect(res.statusCode).toBe(404);
    });

    test('Devuelve 404 para ID inexistente', async () => {
        const res = await request(app).delete('/api/v1/integrantes/999999');
        expect(res.statusCode).toBe(404);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE SEGURIDAD BÁSICA — /api/v1/integrantes
// ─────────────────────────────────────────────────────────────────────────────
describe('[Seguridad] /api/v1/integrantes', () => {

    test('Nombre muy largo no rompe el servidor (devuelve 400 o 201)', async () => {
        const nombreLargo = 'B'.repeat(10000);
        const res = await request(app).post('/api/v1/integrantes').send({
            nombre: nombreLargo, rol: 'artista'
        });
        expect(res.statusCode).not.toBe(500);
    });

    test('Intento de SQL injection en email no rompe el servidor', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({
            nombre: 'SQL Test', rol: 'artista',
            email: "' OR '1'='1"
        });
        // Email inválido → 400, pero NO 500
        expect(res.statusCode).not.toBe(500);
        // La tabla integrantes debe seguir funcionando
        const lista = await request(app).get('/api/v1/integrantes');
        expect(lista.statusCode).toBe(200);
    });

    test('Body completamente vacío devuelve 400 y no 500', async () => {
        const res = await request(app).post('/api/v1/integrantes').send({});
        expect(res.statusCode).toBe(400);
    });

    test('ID con texto devuelve 404 y no 500', async () => {
        const res = await request(app).get('/api/v1/integrantes/no-soy-un-id');
        expect(res.statusCode).toBe(404);
    });
});
