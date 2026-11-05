# Jacaranda-22-Studio-Website
### Francisco Campora -- Joaquin Serra

## Contexto del proyecto
Esta es una pagina web pensada para el estudio musical ameteur llamado "Jacaranda 22 Studios". Desarrolada por 2 estudiantes de la Univerdad de Palermo.

Proyecto para materia de Arquitectura WEB
2do cuatrimestre 2026
Profesor: Diego Marafetti
Horario: Jueves 19:00hs sincrónico

## Estructura del proyecto
El proyecto esta dividido en backend y frontend, dentro del directorio src/

### Backend 
Contiene la API REST de nivel 2 según Richardson, desarrollada en JavaScript utilizando le framework Express.js
Utilizamos una estructura dividida en capas:
* Controllers -> Recibe peticiones HTTP, responde con status codes y llama a los services
* Routes -> Mapeo de los endpoints
* Services -> Lógica de negocio y validaciones
* Models -> Tablas de la Base de datos SQLite, y contiene el archivo de iniciación con datos de prueba
    
### Frontend
Interfaz de usuario desarrollada utilizando el framework Vue 3, consume la API del backend.

La documentación y prueba de la API se encuentra en el directorio docs/. 
* "openapi.yaml" contiene un swagger de la API. 
* "postman_collection.json" Es la coleccion lista para importar en Postman para probar los endpoints de la API.

### Recursos
- Proyectos: Permite crear, listar, actualizar y eliminar proyectos musicales. Osea las cancciones, albumes, etc. Cada proyecto tiene un nombre, tipo, estado, fecha de inicio, fecha fin estimada, fecha fin del proyecto, genero musical, una descripcion, precio por hora y cantidad de horas
- Integrantes: Permite asignar y desvincular integrantes a los proyectos musicales. Osea los musicos, productores, etc. Cada integrante tiene un nombre, rol, email y telefono
- Reportes: Informacion clave. Se dividen por tipo que se pasan por parametro. hay reporte de estado de los proyectos, reporte de los generos musciales, reportes financieros y general.

Metodos de los recursos:
- Proyectos: GET (listando todos los proyectos y proyecto por id), POST, PUT, DELETE. GET, POST y DELETE (pasando ID del integrante) de integrantes de un proyecto por id de proyecto. 
- Integrantes: GET (listando todos los integrantes y integrante por id), POST, PUT, DELETE
- Reportes: GET (pasando parametro tipo=estado|genero|financiero|general)

# Ejecutar el proyecto
### Pre-requisitos
- Tener instalado Docker y Docker Compose en el sistema operativo.
- Alternativa sin Docker, tener instalado Node.js y npm en el sistema operativo.

## Paso a paso para ejecutar el proyecto con Docker
1. Clonar el repositorio del proyecto en la computadora local ó descargar el proyecto en formato ZIP y descomprimirlo ¡IMPORTANTE LA BRANCH MAIN!.
2. Abrir una terminal y navegar hasta la carpeta raiz del proyecto, donde se encuentra el archivo docker-compose.yml.
3. Para construir y levantar los contenedores ejecutar el comando: `docker compose up --build`
4. Esperar a que se complete la construcción de los contenedores y la inicialización.
5.1 Una vez que los contenedores estan levantados, abrir un navegador web y acceder a la siguiente URL: http://localhost:5173 para ver la interfaz de usuario del proyecto. Aclaracion [5173] es el puerto por default que utiliza Vue 3 al instalarlo con Vite, si se cambia el puerto en el archivo docker-compose.yml, se debe acceder a la URL con el puerto correspondiente.
5.2 Para comprobar el correcto funcionamiento del backend se puede acceder a la siguiente URL: http://localhost:3000.
6. Utilizar la interfaz web y/o Postman para probar los endpoints de la API REST.
7. Para detener los contenedores de Docker, presionar Ctrl+C en la terminal y ejecutar el comando: `docker compose down`.

---
### Base de datos
Se utilizo SQLite como base de datos relacional para almacenar la información de los proyectos y sus integrantes. La base de datos se inicializa automáticamente con algunos datos de prueba. No es necesario realizar ninguna configuración adicional para la base de datos.


### Herramientas utilizadas
Los lenguajes, frameworks y librerias utilizadas:
* Para este proyecto se utilizo Express.js como framework de Javascript.
* Vue 3 como framework para el frontend.
* SQLite como base de datos relacional.
* Git como sistema de control de versiones.
* Github como repositorio remoto para el proyecto.
* Postman para el testing de los endpoints de la API REST.
* Docker para la contenerización de la aplicacion y su despliegue en un servidor local.



## Mejoras para nuevas versiones
- Utilizar worfklows de Github para automatizar el despliegue del proyecto en un servidor remoto.
- Agregar logins y roles de usuario para la gestion de proyectos e integrantes. Que cada usuario tenga su propio proyecto y pueda invitar a otros usuarios a participar en el proyecto y que los usuarios puedan ver los proyectos en los que participan y sus integrantes.
- Carga de archivos de audio .wav y .mp3 en la mejor calidad posible a 44.1 khz y a 48khz.
- Agregar un reproductor de audio para escuchar los archivos de audio cargados en la pagina web.

