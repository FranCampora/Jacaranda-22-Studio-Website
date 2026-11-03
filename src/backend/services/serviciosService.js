const servicios = [
    {
        id: 1,
        nombre: 'Grabacion',
        precio: 25000,
        descripcion: 'Sesion de grabacion por hora',
        duracion: '1 hora'
    },
    {
        id: 2,
        nombre: 'Mezcla',
        precio: 30000,
        descripcion: 'mezcla de un tema'
    }
];

function obtenerTodos() {
    return servicios;
}

module.exports = { obtenerTodos };