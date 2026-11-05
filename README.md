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

* Routes -> Mapeo de los endpoints
* Controllers -> Recibe peticiones HTTP, responde con status codes y llama a los services
* Services -> Lógica de negocio y validaciones
* Models -> Ejecuta consultas SQL directamente en la base de datos. Además contiene el archivo de iniciación con datos de prueba.

### Frontend
Interfaz de usuario desarrollada utilizando el framework Vue 3, consume la API del backend.

La documentación y prueba de la API se encuentra en el directorio docs/. 
* "openapi.yaml" contiene un swagger de la API. 
* "postman_collection.json" Es la coleccion lista para importar en Postman para probar los endpoints de la API.

### Recursos
* **Proyecto:** Datos de los proyectos musicales (`id`, `nombre`, `tipo`, `estado`, `fecha_inicio`, `fecha_fin_estimada`, `fecha_fin`, `genero`, `descripcion`, `precio_por_hora`, `cantidad_horas`).
* **Integrante:** Datos de los integrantes o colaboradores (`id`, `nombre`, `rol`, `email`, `telefono`).
* **Proyecto_Integrantes (Relación N:M):** Asignación de integrantes a proyectos (`proyecto_id`, `integrante_id`, `rol_en_proyecto`).
* **Reportes:** Resúmenes y métricas derivados de los proyectos (`tipo`, `titulo`, `datos` / `finanzas` / `distribucionEstados` / `distribucionGeneros`).


Metodos de los recursos del backend:
- **Proyectos**: GET (listando todos los proyectos y proyecto por id), POST, PUT, DELETE. GET, POST y DELETE (pasando ID del integrante) de integrantes de un proyecto por id de proyecto. 
- **Integrantes**: GET (listando todos los integrantes y integrante por id), POST, PUT, DELETE
- **Reportes**: GET (pasando parametro tipo=estado|genero|financiero|general)

* **Documentación complementaria:**
	- Colección de Postman: [`docs/Jacaranda22_Postman_collection.json`](docs/Jacaranda22_Postman_collection.json)
	- Endpoints en Markdown: [`docs/ENDPOINTS.md`](docs/ENDPOINTS.md)

---


# Ejecutar el proyecto
### Pre-requisitos
- Tener instalado Docker y Docker Compose en el sistema operativo.
- Alternativa sin Docker, tener instalado Node.js y npm en el sistema operativo.


### Opción 1: Con Docker
(Puerto Backend: 3000 | Puerto Frontend: 5173)

1. Clonar el repositorio y situarse en la raíz del proyecto (donde se encuentra `docker-compose.yml`).
2. Asegurarse de tener Docker Desktop iniciado.
3. Construir y levantar los contenedores:
	```bash
	docker compose up --build
	```
4. Acceso a los servicios:
	- **Frontend (Web UI):** [http://localhost:5173](http://localhost:5173)
	- **Backend API:** [http://localhost:3000](http://localhost:3000)
	- **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)
5. Para detener los contenedores: `Ctrl + C` y luego `docker compose down`.

### Opción 2: Sin Docker (Local con Node.js y npm)

1. **Iniciar Backend:**
	```bash
	cd src/backend
	npm install
	npm run dev
	```
	- El servidor backend estará corriendo en: [http://localhost:3000](http://localhost:3000)

2. **Iniciar Frontend (en otra terminal):**
	```bash
	cd src/frontend
	npm install
	npm run dev
	```
	- El frontend estará corriendo en: [http://localhost:5173](http://localhost:5173)




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


## Aclaracion sobre branches
El proyecto fue realizado por dos personas (Francisco y Joaquin), ambos tiene su propia branch (dev_Fran y dev_j) dedicadas al TP de entrega final de la materia. Tambien hay dos branchs más que fueron dedicadas a pequeñas practicas de la materia (aunque no todas fueron subidas a el repositorio).
La mayor parte del trabajo fue realizada de forma presencial en conjunto, uniendo las ramas al main y luego trabajando directamente en el main.