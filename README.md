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
Contiene la API REST de nivel 2 según Richardson, desarrollada en JavaScript utilizando le framework Express.js (Versionada en **`/api/v2/`** desde el **Lunes 23/11/2026**).
Utilizamos una estructura dividida en capas:

* Routes -> Mapeo de los endpoints
* Controllers -> Recibe peticiones HTTP, responde con status codes y llama a los services
* Services -> Lógica de negocio y validaciones
* Models -> Ejecuta consultas SQL directamente en la base de datos. Además contiene el archivo de iniciación con datos de prueba.

### Frontend
Interfaz de usuario desarrollada utilizando el framework Vue 3, consume la API del backend.

### Base de datos
Se utilizo SQLite como base de datos relacional para almacenar la información de los proyectos y sus integrantes. La base de datos se inicializa automáticamente con algunos datos de prueba. No es necesario realizar ninguna configuración adicional para la base de datos.


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

1. Clonar el repositorio.
2. Asegurarse de tener Docker Desktop iniciado.
3. Abrir una terminal, situandose en la raíz del proyecto (donde se encuentra `docker-compose.yml`)
4. Ejecutar el comando para construir y levantar los contenedores:
	```bash
	docker compose up --build
	```
5. Acceso a los servicios:
	- **Frontend (Web UI):** [http://localhost:5173](http://localhost:5173)
	- **Backend API:** [http://localhost:3000](http://localhost:3000)
	- **Health Check:** [http://localhost:3000/health](http://localhost:3000/health)
6. Para detener los contenedores: `Ctrl + C` y luego `docker compose down`.

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

### Herramientas utilizadas
Los lenguajes, frameworks y librerias utilizadas:
* Para este proyecto se utilizo Express.js como framework de Javascript.
* Vue 3 como framework para el frontend.
* SQLite como base de datos relacional.
* Git como sistema de control de versiones.
* Github como repositorio remoto para el proyecto.
* Postman para el testing de los endpoints de la API REST.
* Docker para la contenerización de la aplicacion y su despliegue en un servidor local.
* Jest + Supertest para testing unitario y de integración del backend.

---

## Testing con Jest

### Cómo funcionan los tests

Los tests del backend se encuentran en `src/backend/test/` y utilizan:
- **Jest**: framework de testing que corre y organiza los tests.
- **Supertest**: librería que levanta la app Express en **memoria** sin abrir un puerto real. Esto significa que los tests no interfieren con el puerto 3000 ni con ningún servidor corriendo en simultáneo.

La base de datos usada en los tests es un **archivo temporal en `os.tmpdir()`** (carpeta del sistema operativo), generado con un nombre único por ejecución. No se toca `data/jacaranda.db` en ningún momento. Al finalizar la ejecución de Jest, el archivo temporal queda en la carpeta temp del sistema y puede borrarse manualmente si se desea.

### Tipos de tests implementados

| Archivo | Tipo | Qué cubre |
|---|---|---|
| `server.test.js` | Integración + Seguridad | `GET /`, `GET /health`, 404, JSON inválido, path traversal |
| `proyectos.test.js` | Integración + Unitario + Seguridad | CRUD completo, validaciones del service, SQL injection |
| `integrantes.test.js` | Integración + Unitario + Seguridad | CRUD completo, validaciones del service, SQL injection |
| `reportes.test.js` | Integración + Unitario + Seguridad | 4 tipos de reporte, tipo inválido, SQL injection en query params |

### Correr los tests localmente (sin Docker)

```bash
cd src/backend
npm install          # instala jest y supertest (devDependencies)
npm test             # corre todos los tests
npm run test:coverage  # con reporte de cobertura de código
```

### Correr los tests con Docker (Multi-Stage Build)

Tanto el `Dockerfile` del backend como el del frontend soportan **Multi-Stage Building** con una etapa `--target test`:
- `backend`: corre la suite completa de Jest (82 tests de integración, unitarios y seguridad).
- `frontend`: corre la etapa de test/build verificando que los componentes de Vue compilen sin errores.

> **Importante:** `docker-compose.yml` **no se modifica** y los puertos (`3000` y `5173`) siguen intactos.

#### Opción A: Testear cada parte individualmente
```bash
# Test de Backend (Jest)
docker build --target test -t jacaranda-backend-test ./src/backend
docker run --rm jacaranda-backend-test

# Test de Frontend (Build & check)
docker build --target test -t jacaranda-frontend-test ./src/frontend
docker run --rm jacaranda-frontend-test
```

#### Opción B: Testear ambos juntos con Docker Compose (Profiles)
El mismo `docker-compose.yml` incluye el profile `test`. Solo se activa si lo llamás explícitamente:
```bash
docker compose --profile test run --rm backend-test
docker compose --profile test run --rm frontend-test
```
O ambos a la vez:
```bash
docker compose --profile test up --build --abort-on-container-exit backend-test frontend-test
```

#### Deploy normal (Desarrollo / Producción)
Cuando corrés el comando normal, Docker ignora por completo los servicios de test:
```bash
docker compose up --build
```

---

## Medidas de Seguridad Implementadas

1. **Ocultamiento de información del servidor (`X-Powered-By`)**: Desactivado para prevenir ataques de fingerprinting.
2. **Rate Limiting**: Configurado en `server.js` con una ventana de 100 peticiones cada 60 minutos por IP (`express-rate-limit`), con variables fácilmente ajustables (`RATE_LIMIT_WINDOW_MS` y `RATE_LIMIT_MAX_REQUESTS`).
3. **Límite de tamaño de Payload**: Restringido mediante la variable `MAX_BODY_SIZE` (por defecto `50kb` o configurable por variable de entorno) en `express.json()`.
4. **CORS Restringido**: Configurado mediante un array de orígenes autorizados (`ALLOWED_ORIGINS` en `server.js`). Para sumar nuevos dominios solo se debe agregar el string al array.
5. **Protección contra XSS en Base de Datos**: Validación en los services de proyectos e integrantes que rechaza la persistencia de etiquetas HTML y scripts maliciosos.
6. **Ejecución como usuario no-root en Docker (`node`)**:
   - Por defecto, los contenedores corren bajo el usuario seguro no privilegiado `node` mediante la directiva `USER node`.
   - **¿Cómo alternar entre usuario `root` y `node`?**
     - **Modo seguro (no-root - por defecto):** Dejar la directiva `USER node` activa en `src/backend/Dockerfile` y `src/frontend/Dockerfile`.
     - **Modo root (para tareas de mantenimiento/instalación de paquetes del SO):** Comentar la línea `# USER node` o especificar `USER root` en el Dockerfile. También se puede sobreescribir al ejecutar con Docker:
       ```bash
       docker compose exec --user root backend sh
       ```


## Mejoras para nuevas versiones
- Utilizar workflows de Github Actions para automatizar el despliegue del proyecto en un servidor remoto.
- Agregar logins y roles de usuario para la gestion de proyectos e integrantes. Que cada usuario tenga su propio proyecto, pueda invitar a otros usuarios a participar en el proyecto, que los usuarios puedan ver los proyectos en los que participan y sus integrantes.
- Carga de archivos de audio .wav y .mp3 en la mejor calidad posible a 44.1 khz y a 48khz.
- Agregar un reproductor de audio para escuchar los archivos de audio cargados en la pagina web.
- Implementar un sistema de pagos para que los usuarios puedan pagar por hora de estudio musical, y que el sistema genere un recibo de pago para cada transacción realizada.


## Aclaracion sobre las ramas
El proyecto fue realizado por dos personas (Francisco y Joaquin), ambos tiene su propia branch (dev_Fran y dev_j) dedicadas al TP de entrega final de la materia. Tambien hay dos branchs más que fueron dedicadas a pequeñas practicas de la materia (aunque no todas fueron subidas a el repositorio).
La mayor parte del trabajo fue realizada de forma presencial en conjunto, uniendo las ramas al main y luego trabajando directamente en el main.