const express = require('express');
const app = express();

const PORT = 3000;

const proyectosRouter = require('./routes/proyectos');
const serviciosRouter = require('./routes/servicios');
const integrantesRouter = require('./routes/integrantes');
const reportesRouter = require('./routes/reportes');

app.use(express.json());

//rutas

/*raiz*/
app.get('/', (req, res) => {
    res.send('Servidor backend de Jacaranda funcionando correctamente');
});

app.use('/api/v1/proyectos', proyectosRouter);
app.use('/api/v1/servicios', serviciosRouter);
app.use('/api/v1/integrantes', integrantesRouter);
app.use('/api/v1/reporte-estados', reportesRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});