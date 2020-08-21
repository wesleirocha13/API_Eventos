'use strict'

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event_controller');
const authService = require('../services/auth_service');

router.get('/', EventController.get);
router.get('/id/', EventController.getById);
// Intercepta a rota e só deixa passar se tiver feito autenticação
router.post('/', authService.authorize, EventController.post); 
router.put('/', authService.authorize, EventController.put);
router.delete('/', authService.authorize, EventController.delete);

module.exports = router;