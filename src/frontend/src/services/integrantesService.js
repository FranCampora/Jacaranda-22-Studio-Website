const BASE_URL = 'http://localhost:3000/api/v1/integrantes';

async function obtenerTodos() {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) {
        throw new Error('Error al obtener la lista de integrantes');
    }
    return await respuesta.json();
}

async function obtenerPorId(id) {
    const respuesta = await fetch(`${BASE_URL}/${id}`);
    if (!respuesta.ok) {
        throw new Error(`Error al obtener el integrante con id ${id}`);
    }
    return await respuesta.json();
}

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
