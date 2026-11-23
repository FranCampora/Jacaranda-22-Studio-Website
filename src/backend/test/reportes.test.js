/**
 * =============================================================================
 * TESTS DE INTEGRACIÓN + UNITARIOS — Reportes (/api/v1/reportes)
 * =============================================================================
 *
 * Tests de integración: flujo completo HTTP con supertest.
 * Tests unitarios: lógica de la función generar() del service en aislamiento,
 * incluyendo los 4 tipos de reporte y el manejo de tipo inválido.
 *
 * La DB usada es un archivo temporal en os.tmpdir() (ver setup.js).
 * No se toca data/jacaranda.db en ningún momento.
 * =============================================================================
 */

require('./setup');               // Redirige DB a archivo temporal antes de importar la app
const request = require('supertest');
const app = require('../server');
const reportesService = require('../services/reportesService');

// ─────────────────────────────────────────────────────────────────────────────
// TESTS UNITARIOS — reportesService.generar()
// ─────────────────────────────────────────────────────────────────────────────
describe('[Unitario] reportesService.generar()', () => {

    test('TIPOS_REPORTE exporta exactamente los 4 tipos válidos', () => {
        expect(reportesService.TIPOS_REPORTE).toEqual(
            expect.arrayContaining(['estado', 'genero', 'financiero', 'general'])
        );
        expect(reportesService.TIPOS_REPORTE).toHaveLength(4);
    });

    test('Tipo inválido devuelve null', () => {
        expect(reportesService.generar('inventado')).toBeNull();
        expect(reportesService.generar('')).toBeNull();
        expect(reportesService.generar(null)).toBeNull();
    });

    test('Tipo "general" devuelve objeto con estructura correcta', () => {
        const resultado = reportesService.generar('general');
        expect(resultado).not.toBeNull();
        expect(resultado.tipo).toBe('general');
        expect(resultado).toHaveProperty('titulo');
        expect(resultado).toHaveProperty('fechaGeneracion');
        expect(resultado).toHaveProperty('finanzas');
        expect(resultado).toHaveProperty('distribucionEstados');
        expect(resultado).toHaveProperty('distribucionGeneros');
    });

    test('Tipo "estado" devuelve objeto con estructura correcta', () => {
        const resultado = reportesService.generar('estado');
        expect(resultado).not.toBeNull();
        expect(resultado.tipo).toBe('estado');
        expect(resultado).toHaveProperty('titulo');
        expect(resultado).toHaveProperty('totalProyectos');
        expect(resultado).toHaveProperty('datos');
        expect(Array.isArray(resultado.datos)).toBe(true);
    });

    test('Tipo "genero" devuelve objeto con estructura correcta', () => {
        const resultado = reportesService.generar('genero');
        expect(resultado).not.toBeNull();
        expect(resultado.tipo).toBe('genero');
        expect(resultado).toHaveProperty('totalProyectos');
        expect(resultado).toHaveProperty('datos');
        expect(Array.isArray(resultado.datos)).toBe(true);
    });

    test('Tipo "financiero" devuelve objeto con estructura correcta', () => {
        const resultado = reportesService.generar('financiero');
        expect(resultado).not.toBeNull();
        expect(resultado.tipo).toBe('financiero');
        expect(resultado).toHaveProperty('titulo');
        expect(resultado).toHaveProperty('datos');
        const d = resultado.datos;
        expect(d).toHaveProperty('total_proyectos');
        expect(d).toHaveProperty('total_horas');
        expect(d).toHaveProperty('facturacion_estimada');
        expect(d).toHaveProperty('promedio_precio_hora');
    });

    test('El tipo se normaliza a minúsculas (acepta "GENERAL")', () => {
        const resultado = reportesService.generar('GENERAL');
        expect(resultado).not.toBeNull();
        expect(resultado.tipo).toBe('general');
    });

    test('"fechaGeneracion" del reporte general es un ISO string válido', () => {
        const resultado = reportesService.generar('general');
        expect(() => new Date(resultado.fechaGeneracion)).not.toThrow();
        expect(new Date(resultado.fechaGeneracion).toString()).not.toBe('Invalid Date');
    });

    test('Los valores numéricos del reporte financiero son >= 0', () => {
        const resultado = reportesService.generar('financiero');
        expect(resultado.datos.total_proyectos).toBeGreaterThanOrEqual(0);
        expect(resultado.datos.total_horas).toBeGreaterThanOrEqual(0);
        expect(resultado.datos.facturacion_estimada).toBeGreaterThanOrEqual(0);
        expect(resultado.datos.promedio_precio_hora).toBeGreaterThanOrEqual(0);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE INTEGRACIÓN — /api/v1/reportes
// ─────────────────────────────────────────────────────────────────────────────
describe('[Integración] GET /api/v1/reportes', () => {

    test('Sin parámetro devuelve 200 con tipo "general"', async () => {
        const res = await request(app).get('/api/v1/reportes');
        expect(res.statusCode).toBe(200);
        expect(res.body.tipo).toBe('general');
    });

    test('?tipo=general devuelve 200 con la estructura completa', async () => {
        const res = await request(app).get('/api/v1/reportes?tipo=general');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('finanzas');
        expect(res.body).toHaveProperty('distribucionEstados');
        expect(res.body).toHaveProperty('distribucionGeneros');
        expect(res.body).toHaveProperty('fechaGeneracion');
    });

    test('?tipo=estado devuelve 200 con array de datos', async () => {
        const res = await request(app).get('/api/v1/reportes?tipo=estado');
        expect(res.statusCode).toBe(200);
        expect(res.body.tipo).toBe('estado');
        expect(Array.isArray(res.body.datos)).toBe(true);
        expect(res.body).toHaveProperty('totalProyectos');
    });

    test('?tipo=genero devuelve 200 con array de datos', async () => {
        const res = await request(app).get('/api/v1/reportes?tipo=genero');
        expect(res.statusCode).toBe(200);
        expect(res.body.tipo).toBe('genero');
        expect(Array.isArray(res.body.datos)).toBe(true);
    });

    test('?tipo=financiero devuelve 200 con métricas numéricas', async () => {
        const res = await request(app).get('/api/v1/reportes?tipo=financiero');
        expect(res.statusCode).toBe(200);
        expect(res.body.tipo).toBe('financiero');
        expect(res.body.datos).toHaveProperty('total_proyectos');
        expect(res.body.datos).toHaveProperty('facturacion_estimada');
    });

    test('?tipo=invalido devuelve 400 con lista de tipos válidos', async () => {
        const res = await request(app).get('/api/v1/reportes?tipo=invalido');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('tiposValidos');
        expect(Array.isArray(res.body.tiposValidos)).toBe(true);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DE SEGURIDAD BÁSICA — /api/v1/reportes
// ─────────────────────────────────────────────────────────────────────────────
describe('[Seguridad] /api/v1/reportes', () => {

    test('Parámetro ?tipo con SQL injection devuelve 400 y no 500', async () => {
        const res = await request(app).get("/api/v1/reportes?tipo=' OR 1=1--");
        expect(res.statusCode).toBe(400);
        expect(res.statusCode).not.toBe(500);
    });

    test('Parámetro ?tipo muy largo devuelve 400 y no 500', async () => {
        const tipoLargo = 'x'.repeat(5000);
        const res = await request(app).get(`/api/v1/reportes?tipo=${tipoLargo}`);
        expect(res.statusCode).toBe(400);
        expect(res.statusCode).not.toBe(500);
    });

    test('Reportes no acepta POST (devuelve 404)', async () => {
        const res = await request(app).post('/api/v1/reportes').send({});
        expect(res.statusCode).toBe(404);
    });
});
