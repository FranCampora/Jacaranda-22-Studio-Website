
# Arquitectura Web: Actividad modulo 1

## Joaquin Serra


El proyecto “Jacaranda 22” va a estar orientado a ser una futura pagina web funcional para un estudio de producción musical, lo vamos a desarrollar con mi compañero Francisco Campora.  

Esta actividad se encuentra en el directorio de actividades/modulo_1, en la rama “dev_j”  
Link: https://github.com/FranCampora/Jacaranda-22-Studio-Website/tree/dev_j/actividades/modulo_1

El servidor fue levantado en un contenedor de Docker mediante el Dockerfile, se utiliza la imagen node:lts-alpine que es significativamente más liviana.
La dificultad que tuve fue principalmente relacionada al lenguaje JavaScript, hacía unos cuantos años que no lo tocaba y tuve que volver a repasar la sintaxis. Además que nunca había trabajado con node por lo que consultar con Gemini me fue de gran ayuda, principalmente para comprender que es lo que hace cada sección del codigo.  



### Evidencia de los outputs de la consola

```cmd
Jacaranda-22-Studio-Website\actividades\modulo_1>docker exec -t app-1 node --version
v24.19.0

Jacaranda-22-Studio-Website\actividades\modulo_1>docker exec -t app-1 npm --version 
11.17.0

Jacaranda-22-Studio-Website\actividades\modulo_1>curl -i http://localhost:3000/      
HTTP/1.1 200 OK
Content-type: text/plain; charset=utf-8
Date: Wed, 19 Aug 2026 17:37:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Servidor funcionando correctamente

Jacaranda-22-Studio-Website\actividades\modulo_1>curl -i http://localhost:3000/inicio     
HTTP/1.1 404 Not Found
content-type: text/plain; charset=utf-8
Date: Wed, 19 Aug 2026 17:37:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Ruta no encontrada

Jacaranda-22-Studio-Website\actividades\modulo_1>curl -X POST --data-binary @foto.png http://localhost:3000/archivo
Bytes recibidos: 6588

Jacaranda-22-Studio-Website\actividades\modulo_1>curl -X POST --data-binary @comandosGit.md http://localhost:3000/archivo
Bytes recibidos: 1133
```   

### Codigo del server.js  

```JavaScript
const http = require('node:http');
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

```



