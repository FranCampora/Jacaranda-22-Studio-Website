const express = require('express');
const path = require('path');
<<<<<<< HEAD
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('etag', false); /* Desactiva las Etags que lee el navegador para ver si un recurso cambió*/
app.disable('x-powered-by'); /* Seguridad: oculta que el server corre Express para evitar fingerprinting */
const PORT = process.env.PORT || 3000;

// =============================================================================
// VARIABLES DE CONFIGURACIÓN DE SEGURIDAD
// =============================================================================

// Propuesta 3: Tamaño máximo de payload para JSON entrante
// Modificar esta variable (o por variable de entorno MAX_BODY_SIZE) si en el futuro
// se envían cargas mayores (ej. metadatos de audio, etc.)
const MAX_BODY_SIZE = process.env.MAX_BODY_SIZE || '50kb';

// Propuesta 4: Array de orígenes permitidos para CORS (whitelist)
// Para agregar nuevos dominios en el futuro simplemente añadir el string al array
const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

// Propuesta 2: Rate Limiting
// 100 peticiones cada 60 minutos por IP para proteger la API contra ataques DoS/fuerza bruta
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 60 minutos en milisegundos
const RATE_LIMIT_MAX_REQUESTS = 100;         // Máximo 100 peticiones en esa ventana

const apiLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS,
    message: {
        status: 'Error',
        error: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente en 60 minutos.'
    },
    standardHeaders: true, // Devuelve información del rate limit en headers `RateLimit-*`
    legacyHeaders: false,  // Desactiva los headers antiguos `X-RateLimit-*`
    // En entorno de tests omitimos bloquear para no interrumpir suites de integración
    skip: () => process.env.NODE_ENV === 'test'
});

// Importación de routers
=======
const app = express();

const PORT = 3000;

>>>>>>> c929ec0690a35226130180262185f063947eb3f1
const proyectosRouter = require('./routes/proyectos');
const integrantesRouter = require('./routes/integrantes');
const reportesRouter = require('./routes/reportes');

<<<<<<< HEAD
// Middlewares globales
// CORS restringido a los orígenes autorizados
app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (como clientes REST locales, curl, tests o Postman)
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Bloqueado por política de CORS: origen no permitido.'));
    }
}));

// Aplicar Rate Limiter a las rutas de la API
app.use('/api/', apiLimiter);

app.use(express.json({ limit: MAX_BODY_SIZE }));/* Convierte el JSON en objeto req.body con límite de peso */

// Log de peticiones para la consola, para que vaya mostrando que va ahaciendo
app.use((req, res, next) => {
    console.log(`¨[HTTP] ${req.method}: ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Servir frontend compilado si existe (para producción integrada)
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Rutas raiz, para chekear que funcione el back
app.get('/', (req, res) => {
    res.status(200).send('Servidor backend de Jacaranda 22 Studios funcionando correctamente');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Servidor backend en funcionamiento',
=======
app.use(express.json());

// frontend compilado de Vue (src/frontend/dist), servido por este mismo servidor
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

//rutas

/*raiz*/
app.get('/', (req, res) => {
    res.send('Servidor backend de Jacaranda funcionando correctamente');
});

app.use('/api/proyectos', proyectosRouter);
app.use('/api/integrantes', integrantesRouter);
app.use('/api/reportes', reportesRouter);



// manejo de errores: JSON mal formado -> 400, cualquier otro error -> 500
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'JSON inválido en el body' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

//health
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Servidor backend de Jacaranda funcionando correctamente',
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
        timestamp: new Date().toISOString()
    });
});

<<<<<<< HEAD
// Rutas de la API versionada - endpoints de los recursos
//Aca se va redirigiendo en las peticiones a los distintos routers de la API, que estan en la carpeta routes
app.use('/api/v1/proyectos', proyectosRouter);
app.use('/api/v1/integrantes', integrantesRouter);
app.use('/api/v1/reportes', reportesRouter);

//si no entro en ningun router, empieza a chekear errores. 
// Primero el 404 y luego el 500. Si no entra en ninguno de estos, es que todo esta bien y se ejecuta la peticion

// Error por endpoint no encontrado - 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 'Error',
        error: 'Endpoint no encontrado',
        metodo: req.method,
        ruta: req.originalUrl
    });
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.status === 400) {
        return res.status(400).json({
            status: 'Error',
            error: 'JSON inválido en el cuerpo de la petición'
        });
    }
// Error del server - 500
    console.error('Error no controlado en el servidor:', err);
    return res.status(500).json({
        status: 'Error',
        error: 'Error interno del servidor'
    });
});

// Iniciar el servidor solo si este archivo es ejecutado directamente, y no en jest
if (require.main === module) {
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}

/*
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});*/

module.exports = app;
=======
//endpoint no encontrado
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl,
        method: req.method,
        status: 'Error',
        message: 'Endpoint no encontrado'
    });
});
//error del servidor
app.use((err, req, res, next) => {
    console.error('Error del servidor no manejado:', err);
    res.status(500).json({
        status: 'Error',
        message: 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
