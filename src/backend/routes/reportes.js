const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

//mas endpoints pero unicamente de los reportes. 

// Obtener reportes (por query param ?tipo=estado|genero|financiero|general)
router.get('/', reportesController.obtenerReporte);

module.exports = router;
