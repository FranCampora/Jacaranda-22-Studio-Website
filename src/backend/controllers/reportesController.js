const reportesService = require('../services/reportesService');

function obtenerReporte(req, res) {
    const tipo = req.query.tipo || 'general';
    const reporte = reportesService.generar(tipo);

    if (!reporte) {
        return res.status(400).json({
            status: 'Error',
            error: `El parámetro "tipo" debe ser uno de los siguientes: ${reportesService.TIPOS_REPORTE.join(', ')}`,
            tiposValidos: reportesService.TIPOS_REPORTE
        });
    }

    return res.status(200).json(reporte);
}

module.exports = {
    obtenerReporte
};
