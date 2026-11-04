// ============================================================================
// Servicio: Integrantes
// Este módulo centraliza las peticiones HTTP a la API RESTful para el recurso
// 'integrantes'. Funciones declaradas de manera explícita sin abreviaciones.
// ============================================================================

const BASE_URL = 'http://localhost:3000/api/v1/integrantes';

// GET /api/v1/integrantes
// Recupera la lista de todos los integrantes registrados.
async function obtenerTodos() {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) {
        throw new Error('Error al obtener la lista de integrantes');
    }
    return await respuesta.json();
}

// GET /api/v1/integrantes/:id
// Recupera un integrante por su ID, incluyendo los proyectos en los que colabora.
async function obtenerPorId(id) {
    const respuesta = await fetch(`${BASE_URL}/${id}`);
    if (!respuesta.ok) {
        throw new Error(`Error al obtener el integrante con id ${id}`);
    }
    return await respuesta.json();
}

// POST /api/v1/integrantes
// Da de alta un nuevo integrante construyendo el payload explícitamente.
async function crear(datos) {
    const cuerpoPeticion = {
        nombre: datos.nombre,
        rol: datos.rol,
        email: datos.email ? datos.email : null,
        telefono: datos.telefono ? datos.telefono : null
    };

    const respuesta = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuerpoPeticion)
    });

    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        const mensajeDetalles = resultado.detalles ? `: ${resultado.detalles.join(' ')}` : '';
        throw new Error((resultado.error || 'Error al crear integrante') + mensajeDetalles);
    }

    return resultado;
}

// PUT /api/v1/integrantes/:id
// Actualiza la información de un integrante existente.
async function actualizar(id, datos) {
    const cuerpoPeticion = {
        nombre: datos.nombre,
        rol: datos.rol,
        email: datos.email ? datos.email : null,
        telefono: datos.telefono ? datos.telefono : null
    };

    const respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuerpoPeticion)
    });

    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        const mensajeDetalles = resultado.detalles ? `: ${resultado.detalles.join(' ')}` : '';
        throw new Error((resultado.error || 'Error al actualizar integrante') + mensajeDetalles);
    }

    return resultado;
}

// DELETE /api/v1/integrantes/:id
// Elimina al integrante de la base de datos (204 No Content).
async function eliminar(id) {
    const respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error(`Error al eliminar el integrante con id ${id}`);
    }

    return true;
}

export const integrantesService = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
