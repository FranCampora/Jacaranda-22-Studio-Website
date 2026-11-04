# Jacaranda-22-Studio-Website
### Francisco Campora -- Joaquin Serra

# Contexto del proyecto
Esta es una pagina web pensada para el estudio musical ameteur llamado "Jacaranda 22 Studios". Desarrolada por 2 estudiantes de la Univerdad de Palermo.

Proyecto para materia de Arquitectura WEB
2do cuatrimestre 2026
Profesor: Diego Marafetti
Horario: Jueves 19:00hs a 22:00hs, sincronica

# Estructura del proyecto
-----------------------------------------------
El proyecto esta compuesto por 2 partes, el backend y el frontend. 
- backend: Contiene una API REST de nivel 2 de Richardson desarrollada en Express, la BBDD y la logica.
- frontend: Contiene la interfaz de usuario desarrollada en Vue.

Los recursos principale de uso son:
- Proyectos: Permite crear, listar, actualizar y eliminar proyectos musicales. Osea las cancciones, albumes, etc. Cada proyecto tiene un nombre, una descripcion y un genero musical.
- Integrantes: Permite asignar y desvincular integrantes a los proyectos musicales. Osea los musicos, productores, etc. Cada integrante tiene un nombre, un apellido y un instrumento musical.
- Reportes: Informacion de los proyectos y sus integrantes. Osea un listado de los proyectos musicales y sus integrantes.

# Ejecutar el proyecto
-----------------------------------------------
## Pre-requisitos
- Tener instalado Docker y Docker Compose en el sistema operativo.
- Si no se quiere (o puede ) utilizar Docker, tener instalado Node.js y npm en el sistema operativo.

## Paso a paso para ejecutar el proyecto con Docker
-----------------------------------------------------------
1. Clonar el repositorio del proyecto en la computadora local ó descargar el proyecto en formato ZIP y descomprimirlo ¡IMPORTANTE LA BRANCH MAIN!.
2. Abrir una terminal y navegar hasta la carpeta del proyecto, visualizando el archivo docker-compose.yml.
3. Ejecutar el siguiente comando para construir y levantar los contenedores de Docker: docker-compose up --build
4. Esperar a que se complete la construcción de los contenedores y la inicialización.
5.1 Una vez que los contenedores estén en funcionamiento, abrir un navegador web y acceder a la siguiente URL: http://localhost:5173 para ver la interfaz de usuario del proyecto. Aclaracion es el puerto por default de Vue con Vite, si se cambia el puerto en el archivo docker-compose.yml, se debe acceder a la URL con el puerto que se cambio.
5.2 Para comprobar el correcto funcionamiento del backend se puede acceder a la siguiente URL: http://localhost:3000.
6. Utilizar la pagina web y POSTMAN para probar los endpoints de la API REST.
7. Para detener los contenedores de Docker, presionar Ctrl+C en la terminal donde se ejecutó el comando docker-compose up --build y luego ejecutar el siguiente comando: docker-compose down
Eso es todo jeje 

## Base de datos
--------------------------------------------
Se utilizo SQLite como base de datos relacional para almacenar la información de los proyectos y sus integrantes. La base de datos ya viene incluida en el proyecto y se inicializa automáticamente al ejecutar el contenedor de Docker. No es necesario realizar ninguna configuración adicional para la base de datos, pero si se quiere se puede modficar el archivo db ó buscar otra ruta y cambiarla en el docker-compose.yml y en el archivo index.js del backend.

## Herramientas utilizadas
-------------------------------------------------
Los lenguajes, frameworks y librerias utilizadas:
* Para este proyecto se utilizo Express como framework de backend de Javascript.
* Vue como framework de frontend de Javascript.
* SQLite como base de datos relacional.
* Git como sistema de control de versiones.
* Github como repositorio remoto para el proyecto.
* Postman para la documentacion de la API REST.
* Docker para la contenedorizacion de la aplicacion y su despliegue en un servidor local.

Aclaracion: Se utilizo la IA principalmente para el frontend y generar datos para la BBDD.


# Mejoras para nuevas versiones
-----------------------------------------------
- Utilizar worfklows de Github para automatizar el despliegue del proyecto en un servidor remoto.
- Agregar logins y roles de usuario para la gestion de proyectos e integrantes. Que cada usuario tenga su propio proyecto y pueda invitar a otros usuarios a participar en el proyecto y que los usuarios puedan ver los proyectos en los que participan y sus integrantes.
- Carga de archivos de audio .wav y .mp3 en la mejor calidad posible a 44.1 khz y a 48khz.
- Agregar un reproductor de audio para escuchar los archivos de audio cargados en la pagina web.


