'use strict'

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event_controller');
const authService = require('../services/auth_service');

router.get('/', EventController.get);
router.get('/id/', EventController.getById);
// Intercepta a rota e só deixa passar se tiver feito autenticação
router.post('/', authService.isAdmin, EventController.post); 
router.put('/', authService.isAdmin, EventController.put);
router.delete('/', authService.isAdmin, EventController.delete);

module.exports = router;