import express from 'express';

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARES GLOBALES
// ==========================================

// Middleware para parsear bodies en formato JSON
app.use(express.json());

// Middleware logger de peticiones entrantes
app.use((req, res, next) => {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] ${req.method} ${req.url}`);
	next();
});

// ==========================================
// 2. DATOS SIMULADOS EN MEMORIA
// ==========================================

let proyectos = [
	{ id: 1, nombre: 'Grabación Single - Los Ecos', estado: 'finalizado' },
	{ id: 2, nombre: 'Mezcla y Mastering EP - Fractal', estado: 'en_proceso' },
	{ id: 3, nombre: 'Producción Álbum - Jacaranda Band', estado: 'en_proceso' },
	{ id: 4, nombre: 'Rolling back the city', estado: 'done' }
];

const servicios = [
	{ id: 1, nombre: 'Grabación en estudio', precioPorHora: 50 },
	{ id: 2, nombre: 'Mezcla y Mastering', precioPorTrack: 120 },
	{ id: 3, nombre: 'Producción musical integral', precioBase: 500 }
];

const integrantes = [
	{ id: 1, nombre: 'Julián Gómez', rol: 'Ingeniero de Grabación'},
	{ id: 3, nombre: 'Skinny Rees', rol: 'Productor'}
];

// ==========================================
// 3. MIDDLEWARE A NIVEL DE RUTA (Validación)
// ==========================================

const validarBodyProyecto = (req, res, next) => {
	const { nombre, estado } = req.body;
	if (!nombre || !estado) {
		return res.status(400).json({ error: 'Campos requeridos: "nombre" y "estado"' });
	}
	next();
};

// ==========================================
// 4. ENDPOINTS
// ==========================================

// GET /api/proyectos - Lista todos los proyectos
app.get('/api/proyectos', (req, res) => {
	res.status(200).json(proyectos);
});

// GET /api/proyectos/:id - Detalle de un proyecto específico
app.get('/api/proyectos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const proyecto = proyectos.find((p) => p.id === id);

	if (!proyecto) {
		return res.status(404).json({ error: 'Proyecto no encontrado' });
	}

	res.status(200).json(proyecto);
});

// POST /api/proyectos - Crea un nuevo proyecto
app.post('/api/proyectos', validarBodyProyecto, (req, res) => {
	const { nombre, estado } = req.body;
	const nuevoProyecto = {
		id: proyectos.length > 0 ? Math.max(...proyectos.map((p) => p.id)) + 1 : 1,nombre,estado
	};

	proyectos.push(nuevoProyecto);
	res.status(201).json(nuevoProyecto);
});


// PUT /api/proyectos/:id - Modifica un proyecto existente
app.put('/api/proyectos/:id', validarBodyProyecto, (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = proyectos.findIndex((p) => p.id === id);

	if (index === -1) {
		return res.status(404).json({ error: 'Proyecto no encontrado' });
	}

	const { nombre, estado } = req.body;
	proyectos[index] = { id, nombre, estado };

	res.status(200).json(proyectos[index]);
});

// DELETE /api/proyectos/:id - Elimina un proyecto
app.delete('/api/proyectos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = proyectos.findIndex((p) => p.id === id);

	if (index === -1) {
		return res.status(404).json({ error: 'Proyecto no encontrado' });
	}

	proyectos.splice(index, 1);
	// 204 No Content no envía body
	res.status(204).send();
});

// GET /api/servicios - Lista los servicios del estudio
app.get('/api/servicios', (req, res) => {
	res.status(200).json(servicios);
});

// GET /api/integrantes - Lista miembros del equipo
app.get('/api/integrantes', (req, res) => {
	res.status(200).json(integrantes);
});

// GET /api/reportes/proyectos-estado - Proyectos agrupados por estado
app.get('/api/reportes/proyectos-estado', (req, res) => {
	const reporte = proyectos.reduce((acumulador, proyecto) => {
	const estado = proyecto.estado;
	acumulador[estado] = (acumulador[estado] || 0) + 1;
	return acumulador;
	}, {});

	res.status(200).json(reporte);
});

// ==========================================
// 5. MIDDLEWARES DE CIERRE (404 y Errores)
// ==========================================

// Captura cualquier ruta inexistente
app.use((req, res) => {
	res.status(404).json({ error: '404: Ruta no encontrada' });
});

// Middleware de manejo centralizado de errores (4 parámetros requeridos)
app.use((err, req, res, next) => {
	console.error('Error no controlado:', err.stack);
	res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
	console.log(`Servidor Jacaranda 22 escuchando en http://localhost:${PORT}`);
});