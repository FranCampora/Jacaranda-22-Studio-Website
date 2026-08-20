import http from 'node:http';
const PORT = 3000;


// Configuracion del servidor (endpoints)
const server = http.createServer((req,res) => {
	const {method, url} = req;

	//Ruta GET /
	if (method === 'GET' && url === '/'){
		res.writeHead(200, {'Content-type' : 'text/plain; charset=utf-8'});
		res.end('Servidor funcionando correctamente');
		return;
	}

	//Ruta POST /archivo
	if (method === 'POST' && url === '/archivo'){
		let totalBytes = 0;

	//Cuenta los bytes de los paquetes recibidos
		req.on('data', (chunk) => {
			totalBytes += chunk.length;
		});

	//Finaliza la recepcion de datos
		req.on('end', () => {
			res.writeHead(200, {'content-type' : 'text/plain; charset=utf-8'});
			res.end(`Bytes recibidos: ${totalBytes}`);
		});

	//Errores en el stream del request
		req.on('error', (err) => {
			res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Error interno al procesar el archivo');
		});
		
		return;
	}

	//Si la url no es GET / o POST /archivo
	res.writeHead(404, {'content-type' : 'text/plain; charset=utf-8'});
	res.end('Ruta no encontrada');
});


//Abre el puerto y se queda escuchando peticiones
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


//comando para enviar el POST 'curl -X POST --data-binary @comandosGit.md http://localhost:3000/archivo'
//'curl -X POST --data-binary @foto.png http://localhost:3000/archivo'


