const express = require('express');
const router = express.Router();
const serviciosService = require('../services/serviciosService');

router.get('/', (req, res) => {
    res.status(200).json(serviciosService.obtenerTodos());
});

module.exports = router;