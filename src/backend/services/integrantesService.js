const integrantes = [
    {
        id: 1,
        nombre: 'Francisco Campora',
        aka: 'Skinny Rees',
        rol: 'Productor',
        mail: 'camporafran@gmail.com',
        instagram: 'https://www.instagram.com/skinnyrees/'
    },
    {
        id: 2,
        nombre: 'Joaquin Serra',
        aka: 'Serra',
        rol: 'Che Pibe',
        mail: 'joahserra@gmail.com',
        instagram: 'https://www.instagram.com/joahserra/'
    }
];

function obtenerTodos() {
    return integrantes;
}

module.exports = { obtenerTodos };