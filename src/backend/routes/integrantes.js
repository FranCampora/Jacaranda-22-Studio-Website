const express = require('express');
const router = express.Router();
const integrantesService = require('../services/integrantesService');

router.get('/', (req, res) => {
    res.status(200).json(integrantesService.obtenerTodos());
});

module.exports = router;