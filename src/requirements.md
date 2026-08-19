Requerimientos para pagina de Jacaranda 22 Studio
Proyecto universitario:
* Materia: Arquitectura Web
* Profesor:
* Alumnos: Francisco Campora y Joaquin Serra
* Modalidad: Online sincronica - jueves a la noche

---
## Descripción del proyecto

Página web para Jacaranda 22 Studio, un estudio de producción musical.

----------------------------------------------------------------

## REQUERIMIENTOS OBLIGATORIOS PROPUESTO POR EL PROFESOR

### BACKEND
* Será el responsable de implementar la lógica de negocio y la persistencia de datos. Se recomienda el uso del framework Express (expressjs.com).

* API RESTful: Debe exponer una API REST (Nivel 2 de Richardson como mínimo) para que los clientes consuman los distintos servicios. En este punto se evaluará fuertemente el diseño de los endpoints y la aplicación de buenas prácticas (uso correcto de verbos HTTP, códigos de estado, etc.).

* Persistencia de Datos: Se puede utilizar un motor de base de datos a elección o, alternativamente, implementar una persistencia en memoria. En cualquiera de los dos casos, al inicializar la aplicación, el sistema deberá cargar automáticamente un set de datos por defecto (seed) para facilitar la corrección y el testing.

### FRONTEND
* Se encargará exclusivamente de la capa de presentación y la interacción con el usuario. Se puede utilizar una librería o framework moderno (React, Vue, Angular) o desarrollarlo directamente en Vanilla JS. Se evaluará el uso semántico de HTML y la correcta aplicación de CSS.

* Gestión de Datos (CRUD): La interfaz debe implementar al menos un flujo completo de ABM (Alta, Baja y Modificación) o CRUD.

* Reportes: Se debe implementar al menos una pantalla dedicada a la visualización de un reporte derivado de los datos del sistema.

* Aclaración: La implementación de un sistema de autenticación/login es completamente opcional.

### TESTING
* Testing de Endpoints: Se deben realizar pruebas sobre los endpoints del backend. Estas pueden entregarse a través de una colección exportada de herramientas como Postman, scripts de cURL, o bien estar codificadas mediante frameworks de testing.

Aclaración: No se requiere realizar unit testing sobre el código del frontend.


### Construcción y Ejecución
Documentación de despliegue: El repositorio debe incluir un archivo README.md claro y detallado con los pasos exactos para instalar las dependencias, compilar (si aplica) y ejecutar el proyecto.
Scripts: Se debe incluir el uso de scripts de automatización (por ejemplo, a través de package.json utilizando npm o yarn).

----------------------------------------------------------------
## REQUERIMIENTOS PROPIOS PARA LA PAGINA 
Segundo plano, lo principal son los requerimentos del profesor

## Requerimientos funcionales
 
* Poder ver proyectos realizados por Jacaranda 22 Studio
* Poder ver información de contacto del estudio
* Poder ver información de los integrantes del estudio
* Poder ver información de los servicios ofrecidos por el estudio

### Vista del cliente
 
* Poder ver los planes contratados con el estudio
* Poder ver el estado y detalle de cada plan contratado
### Vista de los productores
 
* Poder ver los planes contratados por los clientes
* Poder modificar los planes contratados por los clientes

 
## Requerimientos no funcionales
 
* Interfaz de usuario amigable y responsiva
* Integración con redes sociales