'use strict'

const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address_controller');
const authService = require('../services/auth_service');

router.get('/', authService.authorize, AddressController.get);
router.get('/id', AddressController.getById);
router.get('/user/', authService.authorize, AddressController.getByUser);
router.put('/', authService.authorize, AddressController.put);
router.delete('/', authService.authorize, AddressController.delete);
router.post('/', authService.authorize, AddressController.post);

module.exports = router;