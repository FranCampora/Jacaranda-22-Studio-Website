const express = require('express');
const router = express.Router();
const reportesService = require('../services/reportesService');

/*Reporte de estados*/
router.get('/', (req, res) => {
    res.status(200).json(reportesService.proyectosPorEstado());
});

module.exports = router;