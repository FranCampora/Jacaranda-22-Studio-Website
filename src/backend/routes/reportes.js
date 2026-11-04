const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Obtener reportes (por query param ?tipo=estado|genero|financiero|general)
router.get('/', reportesController.obtenerReporte);

module.exports = router;
