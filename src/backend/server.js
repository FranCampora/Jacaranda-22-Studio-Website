const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

const proyectosRouter = require('./routes/proyectos');
const integrantesRouter = require('./routes/integrantes');
const reportesRouter = require('./routes/reportes');

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

// frontend compilado de Vue (src/frontend/dist), servido por este mismo servidor
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));



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
        timestamp: new Date().toISOString()
    });
});

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