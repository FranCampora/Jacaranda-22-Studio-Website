const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.set('etag', false);
const PORT = process.env.PORT || 3000;

// Importación de routers
const proyectosRouter = require('./routes/proyectos');
const integrantesRouter = require('./routes/integrantes');
const reportesRouter = require('./routes/reportes');

// Middlewares globales
app.use(cors());
app.use(express.json());

// Log de peticiones para la consola
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
        timestamp: new Date().toISOString()
    });
});

// Rutas de la API versionada
app.use('/api/v1/proyectos', proyectosRouter);
app.use('/api/v1/integrantes', integrantesRouter);
app.use('/api/v1/reportes', reportesRouter);


// Error por endpoint no encontrado - 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 'Error',
        error: 'Endpoint no encontrado',
        metodo: req.method,
        ruta: req.originalUrl
    });
});

// Error del server - 500
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err.status === 400) {
        return res.status(400).json({
            status: 'Error',
            error: 'JSON inválido en el cuerpo de la petición'
        });
    }

    console.error('Error no controlado en el servidor:', err);
    return res.status(500).json({
        status: 'Error',
        error: 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;
