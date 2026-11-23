/**
 * =============================================================================
 * TESTS DE INTEGRACIÓN — Servidor base (server.js)
 * =============================================================================
 * Verifica el comportamiento del servidor Express en sí mismo:
 * endpoint raíz, health check, manejo de 404 y JSON inválido.
 *
 * Tipo: Integración con supertest.
 * supertest levanta la app Express en memoria sin abrir un puerto real,
 * por eso no hay conflicto con el puerto 3000 que usa la app en producción.
 * =============================================================================
 */

require('./setup');               // Redirige DB a archivo temporal antes de importar la app
const request = require('supertest');
const app = require('../server');

describe('Servidor base', () => {

    test('GET / devuelve 200 y el mensaje de bienvenida', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Jacaranda 22 Studios');
    });

    test('GET /health devuelve 200 con status OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('OK');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('message');
    });

    test('GET a un endpoint inexistente devuelve 404 con el formato de error correcto', async () => {
        const res = await request(app).get('/api/v2/no-existe');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            status: 'Error',
            error: 'Endpoint no encontrado',
            metodo: 'GET',
            ruta: '/api/v2/no-existe'
        });
    });

    test('POST con JSON inválido devuelve 400 con mensaje claro', async () => {
        const res = await request(app)
            .post('/api/v2/proyectos')
            .set('Content-Type', 'application/json')
            .send('{ "nombre": "falta cerrar');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('JSON inválido en el cuerpo de la petición');
    });

    // --- Seguridad básica ---

    test('[Seguridad] Cabecera X-Powered-By no debe exponer "Express"', async () => {
        const res = await request(app).get('/health');
        // Express expone esta cabecera por defecto. Si está presente, es un dato
        // que un atacante puede usar para fingerprinting del servidor.
        // Si este test falla, agregar app.disable('x-powered-by') en server.js.
        expect(res.headers['x-powered-by']).toBeUndefined();
    });

    test('[Seguridad] Métodos HTTP no permitidos en /health devuelven 404', async () => {
        const res = await request(app).delete('/health');
        expect(res.statusCode).toBe(404);
    });

    test('[Seguridad] Rutas con path traversal no devuelven archivos del sistema', async () => {
        const res = await request(app).get('/../../../etc/passwd');
        expect(res.statusCode).toBe(404);
    });
});
