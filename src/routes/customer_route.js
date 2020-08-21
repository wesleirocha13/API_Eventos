'use strict'

const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer_controller');
const authService = require('../services/auth_service');

router.get('/', CustomerController.get);
router.post('/', CustomerController.post);
//Rota criada para realizar login
router.post('/authenticate', CustomerController.authenticate);
router.post('/refresh-token', authService.authorize, CustomerController.refreshToken);
router.put('/', authService.authorize, CustomerController.put);

module.exports = router;