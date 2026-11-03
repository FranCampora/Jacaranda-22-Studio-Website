const express = require('express');
const router = express.Router();
const reportesService = require('../services/reportesService');

/*Reporte de estados*/
router.get('/', (req, res) => {
    const reporte = reportesService.generar(req.query.tipo);
    if (!reporte) {
        return res.status(400).json({
            error: `El parámetro "tipo" es obligatorio y debe ser uno de: ${reportesService.TIPOS_REPORTE.join(', ')}`
        });
    }
    res.status(200).json(reporte);
});

/*agregar mas endpoints de reportes x parametro*/ 
module.exports = router;