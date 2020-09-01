'use strict'

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event_controller');
const authService = require('../services/auth_service');

router.get('/', EventController.get);
router.get('/user/', authService.authorize, EventController.getByUser);
router.get('/id/', authService.authorize, EventController.getById);
router.get('/filter/', EventController.getByFilter);
router.get('/filterAuth/', authService.authorize, EventController.getByFilterAuth);
router.post('/', authService.authorize, EventController.post); 
router.put('/', authService.authorize, EventController.put);
router.delete('/', authService.authorize, EventController.delete);

module.exports = router;