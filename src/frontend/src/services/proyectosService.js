const BASE_URL = 'http://localhost:3000/api/v1/proyectos';

async function obtenerTodos() {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) {
        throw new Error('Error al obtener la lista de proyectos');
    }
    return await respuesta.json();
}

async function obtenerPorId(id) {
    const respuesta = await fetch(`${BASE_URL}/${id}`);
    if (!respuesta.ok) {
        throw new Error(`Error al obtener el proyecto con id ${id}`);
    }
    return await respuesta.json();
}

async function crear(datos) {
    const cuerpoPeticion = {
        nombre: datos.nombre,
        tipo: datos.tipo,
        estado: datos.estado,
        fecha_inicio: datos.fecha_inicio,
        fecha_fin_estimada: datos.fecha_fin_estimada ? datos.fecha_fin_estimada : null,
        fecha_fin: datos.fecha_fin ? datos.fecha_fin : null,
        genero: datos.genero ? datos.genero : null,
        descripcion: datos.descripcion ? datos.descripcion : null,
        precio_por_hora: datos.precio_por_hora !== '' && datos.precio_por_hora !== null ? Number(datos.precio_por_hora) : 0,
        cantidad_horas: datos.cantidad_horas !== '' && datos.cantidad_horas !== null ? Number(datos.cantidad_horas) : 0
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
        throw new Error((resultado.error || 'Error al crear proyecto') + mensajeDetalles);
    }

    return resultado;
}

async function actualizar(id, datos) {
    const cuerpoPeticion = {
        nombre: datos.nombre,
        tipo: datos.tipo,
        estado: datos.estado,
        fecha_inicio: datos.fecha_inicio,
        fecha_fin_estimada: datos.fecha_fin_estimada ? datos.fecha_fin_estimada : null,
        fecha_fin: datos.fecha_fin ? datos.fecha_fin : null,
        genero: datos.genero ? datos.genero : null,
        descripcion: datos.descripcion ? datos.descripcion : null,
        precio_por_hora: datos.precio_por_hora !== '' && datos.precio_por_hora !== null ? Number(datos.precio_por_hora) : 0,
        cantidad_horas: datos.cantidad_horas !== '' && datos.cantidad_horas !== null ? Number(datos.cantidad_horas) : 0
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
        throw new Error((resultado.error || 'Error al actualizar proyecto') + mensajeDetalles);
    }

    return resultado;
}

async function eliminar(id) {
    const respuesta = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error(`Error al eliminar el proyecto con id ${id}`);
    }

    return true;
}

async function obtenerIntegrantes(proyectoId) {
    const respuesta = await fetch(`${BASE_URL}/${proyectoId}/integrantes`);
    if (!respuesta.ok) {
        throw new Error(`Error al obtener integrantes del proyecto ${proyectoId}`);
    }
    return await respuesta.json();
}

async function asignarIntegrante(proyectoId, integranteId, rolEnProyecto) {
    const cuerpoPeticion = {
        integrante_id: Number(integranteId),
        rol_en_proyecto: rolEnProyecto ? rolEnProyecto : null
    };

    const respuesta = await fetch(`${BASE_URL}/${proyectoId}/integrantes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuerpoPeticion)
    });

    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        throw new Error(resultado.error || 'Error al asignar integrante');
    }

    return resultado;
}

async function desvincularIntegrante(proyectoId, integranteId) {
    const respuesta = await fetch(`${BASE_URL}/${proyectoId}/integrantes/${integranteId}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error(`Error al desvincular integrante ${integranteId} del proyecto ${proyectoId}`);
    }

    return true;
}

export const proyectosService = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerIntegrantes,
    asignarIntegrante,
    desvincularIntegrante
};
