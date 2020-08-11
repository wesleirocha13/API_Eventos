'use strict'

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order_controller');
const authService = require('../services/auth_service');

router.get('/', authService.authorize, OrderController.get);
router.post('/', authService.authorize, OrderController.post);

module.exports = router;