const integrantesModel = require('../models/integrantesModel');

const ROLES = ['artista', 'feat', 'productor', 'banda', 'sesionista'];

function validar(body) { /* nombre y rol obligatorios, email con formato válido */ }

function obtenerTodos() {
    return integrantesModel.obtenerTodos();
}
// + obtenerPorId, crear, actualizar, eliminar

module.exports = { obtenerTodos };