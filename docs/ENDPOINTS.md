# Documentación de Endpoints - Jacaranda 22 Studio API

# Endpoints:

## Health Check (`/health`)
- Verifica que el servidor backend esté funcionando correctamente.
* **GET `/health`**
  - **Respuesta 200:**
    ```json
    {
      "status": "OK",
      "message": "Servidor backend en funcionamiento",
      "timestamp": "2026-11-05T20:45:00.000Z"
    }
    ```

---

## Proyectos (`/api/v1/proyectos`)

* **GET `/api/v1/proyectos`** -> Lista todos los proyectos registrados, ordenados del más nuevo al más viejo por ID.
  - **Respuesta 200:**
    ```json
    [
      {
        "id": 1,
        "nombre": "Proyecto 1",
        "tipo": "single",
        "estado": "grabacion",
        "fecha_inicio": "2026-01-05",
        "fecha_fin_estimada": "2026-02-15",
        "fecha_fin": null,
        "genero": "Rap",
        "descripcion": "Grabación de voces",
        "precio_por_hora": 2500,
        "cantidad_horas": 10
      }
    ]
    ```

* **GET `/api/v1/proyectos/:id`** -> Obtiene el detalle de un proyecto por su ID, incluyendo el listado de sus integrantes asignados.
  - **Respuesta 200:**
    ```json
    {
      "id": 1,
      "nombre": "Proyecto 1",
      "tipo": "single",
      "estado": "grabacion",
      "fecha_inicio": "2026-01-05",
      "fecha_fin_estimada": "2026-02-15",
      "fecha_fin": null,
      "genero": "Rap",
      "descripcion": "Grabación de voces",
      "precio_por_hora": 2500,
      "cantidad_horas": 10,
      "integrantes": [
        {
          "id": 1,
          "nombre": "Lucas Rodríguez",
          "rol": "artista",
          "email": "lucas@example.com",
          "telefono": "1122334455",
          "rol_en_proyecto": "Voz principal"
        }
      ]
    }
    ```
  - **Error 404:** Proyecto no encontrado
    ```json
    {
      "status": "Error",
      "error": "Proyecto no encontrado"
    }
    ```

* **POST `/api/v1/proyectos`** -> Crea un nuevo proyecto. Campos obligatorios: `nombre`, `tipo`, `estado`, `fecha_inicio`.
  - **Header:** `Location: /api/v1/proyectos/:id`
  - **Body ejemplo:**
    ```json
    {
      "nombre": "Nuevo Álbum",
      "tipo": "disco",
      "estado": "nuevo",
      "fecha_inicio": "2026-03-01",
      "fecha_fin_estimada": "2026-06-01",
      "fecha_fin": null,
      "genero": "Rock",
      "descripcion": "Primer disco grabado en el estudio",
      "precio_por_hora": 3000,
      "cantidad_horas": 20
    }
    ```
  - **Respuesta 201:** Proyecto creado
    ```json
    {
      "id": 7,
      "nombre": "Nuevo Álbum",
      "tipo": "disco",
      "estado": "nuevo",
      "fecha_inicio": "2026-03-01",
      "fecha_fin_estimada": "2026-06-01",
      "fecha_fin": null,
      "genero": "Rock",
      "descripcion": "Primer disco grabado en el estudio",
      "precio_por_hora": 3000,
      "cantidad_horas": 20
    }
    ```
  - **Error 400:** Datos de entrada inválidos o faltantes
    ```json
    {
      "status": "Error",
      "error": "Datos de entrada inválidos",
      "detalles": [
        "El campo \"nombre\" es obligatorio y debe ser una cadena no vacía."
      ]
    }
    ```

* **PUT `/api/v1/proyectos/:id`** -> Actualiza datos de un proyecto existente (campos opcionales).
  - **Body ejemplo:**
    ```json
    {
      "nombre": "Nuevo Álbum (Fase Mezcla)",
      "estado": "mezcla",
      "cantidad_horas": 35
    }
    ```
  - **Respuesta 200:** Proyecto actualizado
    ```json
    {
      "id": 7,
      "nombre": "Nuevo Álbum (Fase Mezcla)",
      "tipo": "disco",
      "estado": "mezcla",
      "fecha_inicio": "2026-03-01",
      "fecha_fin_estimada": "2026-06-01",
      "fecha_fin": null,
      "genero": "Rock",
      "descripcion": "Primer disco grabado en el estudio",
      "precio_por_hora": 3000,
      "cantidad_horas": 35
    }
    ```
  - **Error 400:** Datos de entrada inválidos
  - **Error 404:** Proyecto no encontrado

* **DELETE `/api/v1/proyectos/:id`** -> Elimina un proyecto por ID y elimina automáticamente todas las asignaciones de integrantes vinculadas a él.
  - **Respuesta 204:** Proyecto eliminado (sin contenido)
  - **Error 404:** Proyecto no encontrado

---

## Integrantes en Proyectos (`/api/v1/proyectos/:id/integrantes`)

* **GET `/api/v1/proyectos/:id/integrantes`** -> Lista los integrantes asignados al proyecto especificado, ordenados por nombre.
  - **Respuesta 200:**
    ```json
    [
      {
        "id": 1,
        "nombre": "Lucas Rodríguez",
        "rol": "artista",
        "email": "lucas@example.com",
        "telefono": "1122334455",
        "rol_en_proyecto": "Voz principal"
      }
    ]
    ```
  - **Error 404:** Proyecto no encontrado

* **POST `/api/v1/proyectos/:id/integrantes`** -> Asigna un integrante existente a un proyecto o actualiza su `rol_en_proyecto`.
  - **Body ejemplo:**
    ```json
    {
      "integrante_id": 2,
      "rol_en_proyecto": "Productor musical"
    }
    ```
  - **Respuesta 200:** Integrante vinculado
    ```json
    {
      "status": "OK",
      "mensaje": "Integrante vinculado exitosamente al proyecto"
    }
    ```
  - **Error 400:** Falta el campo obligatorio `integrante_id`
  - **Error 404:** Proyecto no encontrado o Integrante no encontrado

* **DELETE `/api/v1/proyectos/:id/integrantes/:integranteId`** -> Desvincula a un integrante del proyecto (no borra al integrante del sistema).
  - **Respuesta 204:** Integrante desvinculado (sin contenido)
  - **Error 404:** Proyecto no encontrado o el integrante no estaba asignado al proyecto

---

## Integrantes (`/api/v1/integrantes`)

* **GET `/api/v1/integrantes`** -> Devuelve la lista completa de integrantes, ordenados del más nuevo al más viejo por ID.
  - **Respuesta 200:**
    ```json
    [
      {
        "id": 1,
        "nombre": "Lucas Rodríguez",
        "rol": "artista",
        "email": "lucas@example.com",
        "telefono": "1122334455"
      }
    ]
    ```

* **GET `/api/v1/integrantes/:id`** -> Devuelve un integrante por su ID junto con el listado de proyectos en los que participa.
  - **Respuesta 200:**
    ```json
    {
      "id": 1,
      "nombre": "Lucas Rodríguez",
      "rol": "artista",
      "email": "lucas@example.com",
      "telefono": "1122334455",
      "proyectos": [
        {
          "id": 1,
          "nombre": "Proyecto 1",
          "tipo": "single",
          "estado": "grabacion",
          "fecha_inicio": "2026-01-05",
          "fecha_fin_estimada": "2026-02-15",
          "fecha_fin": null,
          "genero": "Rap",
          "descripcion": "Grabación de voces",
          "precio_por_hora": 2500,
          "cantidad_horas": 10,
          "rol_en_proyecto": "Voz principal"
        }
      ]
    }
    ```
  - **Error 404:** Integrante no encontrado

* **POST `/api/v1/integrantes`** -> Crea un nuevo integrante. Campos obligatorios: `nombre`, `rol`.
  - **Header:** `Location: /api/v1/integrantes/:id`
  - **Body ejemplo:**
    ```json
    {
      "nombre": "Martina Gomez",
      "rol": "productor",
      "email": "martina@jacaranda.com",
      "telefono": "1133445566"
    }
    ```
  - **Respuesta 201:** Integrante creado
    ```json
    {
      "id": 6,
      "nombre": "Martina Gomez",
      "rol": "productor",
      "email": "martina@jacaranda.com",
      "telefono": "1133445566"
    }
    ```
  - **Error 400:** Datos de entrada inválidos (falta nombre o rol, o email con formato inválido)
    ```json
    {
      "status": "Error",
      "error": "Datos de entrada inválidos",
      "detalles": [
        "El campo \"email\" tiene un formato inválido."
      ]
    }
    ```

* **PUT `/api/v1/integrantes/:id`** -> Actualiza los datos de un integrante específico por su ID.
  - **Body ejemplo:**
    ```json
    {
      "rol": "productor general",
      "telefono": "1199887766"
    }
    ```
  - **Respuesta 200:** Integrante actualizado
    ```json
    {
      "id": 6,
      "nombre": "Martina Gomez",
      "rol": "productor general",
      "email": "martina@jacaranda.com",
      "telefono": "1199887766"
    }
    ```
  - **Error 400:** Datos de entrada inválidos
  - **Error 404:** Integrante no encontrado

* **DELETE `/api/v1/integrantes/:id`** -> Elimina un integrante por su ID (también elimina sus asignaciones en proyectos).
  - **Respuesta 204:** Integrante eliminado (sin contenido)
  - **Error 404:** Integrante no encontrado

---

## Reportes (`/api/v1/reportes`)

* **GET `/api/v1/reportes`** -> Devuelve reportes analíticos de los proyectos según el parámetro `?tipo=` (`general` por defecto, `estado`, `genero`, `financiero`).

  - **Consulta General (`?tipo=general` o sin parámetro):**
    - **Respuesta 200:**
      ```json
      {
        "tipo": "general",
        "titulo": "Reporte ejecutivo del estudio Jacaranda 22",
        "fechaGeneracion": "2026-11-05T20:45:00.000Z",
        "finanzas": {
          "total_proyectos": 6,
          "total_horas": 68,
          "facturacion_estimada": 168000,
          "promedio_precio_hora": 2450
        },
        "distribucionEstados": [
          { "estado": "grabacion", "cantidad": 2 },
          { "estado": "mezcla", "cantidad": 2 },
          { "estado": "nuevo", "cantidad": 1 },
          { "estado": "listo", "cantidad": 1 }
        ],
        "distribucionGeneros": [
          { "genero": "Rap", "cantidad": 2 },
          { "genero": "Rock", "cantidad": 2 },
          { "genero": "Pop", "cantidad": 1 },
          { "genero": "Sin género", "cantidad": 1 }
        ]
      }
      ```

  - **Consulta por Estado (`?tipo=estado`):**
    - **Respuesta 200:**
      ```json
      {
        "tipo": "estado",
        "titulo": "Distribución de proyectos por estado",
        "totalProyectos": 6,
        "datos": [
          { "estado": "grabacion", "cantidad": 2 },
          { "estado": "mezcla", "cantidad": 2 }
        ]
      }
      ```

  - **Consulta por Género Musical (`?tipo=genero`):**
    - **Respuesta 200:**
      ```json
      {
        "tipo": "genero",
        "titulo": "Distribución de proyectos por género musical",
        "totalProyectos": 6,
        "datos": [
          { "genero": "Rap", "cantidad": 2 },
          { "genero": "Rock", "cantidad": 2 }
        ]
      }
      ```

  - **Consulta Financiera (`?tipo=financiero`):**
    - **Respuesta 200:**
      ```json
      {
        "tipo": "financiero",
        "titulo": "Reporte económico y de carga horaria",
        "datos": {
          "total_proyectos": 6,
          "total_horas": 68,
          "facturacion_estimada": 168000,
          "promedio_precio_hora": 2450
        }
      }
      ```

  - **Error 400:** Tipo de reporte inválido
    ```json
    {
      "status": "Error",
      "error": "El parámetro \"tipo\" debe ser uno de los siguientes: estado, genero, financiero, general",
      "tiposValidos": ["estado", "genero", "financiero", "general"]
    }
    ```
