import http from 'node:http';
const PORT = 3000;

//http.createServer responde cada vez que llega un request.
//req es request -> la infor q el cliente esta pidiendo al servidor
// res es response -> lo q se contesta el servidor al cliente

// Configuracion del servidor (endpoints)
const server = http.createServer((req, res) => {
    const {method, url} = req;

    console.log(`Request recibido: ${method} ${url}`);

    //status code 200 -> OK

    //Ruta GET /
    if (method === 'GET' && url === '/'){
        res.writeHead(200, {'Content-type' : 'text/plain; charset=utf-8'});
        //write head es para enviar el status code y el tipo de contenido
        res.end('Servidor funcionando correctamente');
        //end es para enviar la respuesta al cliente
        return;//corto la ejeuccion
    }

    //Ruta POST /archivo
    if (method === 'POST' && url === '/archivo'){
        let totalBytes = 0;

        //cada vez que llega un chunk de datos, se ejecuta la funcion
        req.on('data', (chunk) => 
            {totalBytes += chunk.length;

    });
        //cada vvez que termina de llegar todo el archivo, se ejecuta la funcion, osea todos los CHUNKS
        req.on('end', () => {
            res.writeHead(200, {'Content-type' : 'text/plain; charset=utf-8'});
            res.end(`Archivo recibido. Tamaño total: ${totalBytes} bytes`);
        });

        //si hay un error al recibir el archivo, se ejecuta la funcion
        req.on('error', (err) => {
            //status cide 500 -> Internal Server Error
            res.writeHead(500, {'Content-type' : 'text/plain; charset=utf-8'});
            res.end('Error interno al procesar el archivo');
        });

        return;
    }

    //no entro en ninguna de las rutas anteriores, entonces es un error 404
    //queda a proposito ulitmo para que agarre lo que sea de las rutas anteriores
    //404 -> Not Found
    
    res.writeHead(404, {'Content-type' : 'text/plain; charset=utf-8'});
    res.end('Ruta no encontrada');
});

//DEJA AL SERVER ESCUCHANDO EN EL PUERTO 3000
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

/*curl http://localhost:3000/
curl -X POST --data-binary @algun-archivo.bin http://localhost:3000/archivo*/ 