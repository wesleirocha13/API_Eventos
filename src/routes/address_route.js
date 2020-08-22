'use strict'

const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address_controller');
const authService = require('../services/auth_service');

router.get('/', authService.authorize, AddressController.get);
router.get('/user/', authService.authorize, AddressController.getByUser);
router.put('/', authService.authorize, AddressController.put);
router.delete('/', authService.authorize, AddressController.delete);
router.post('/', AddressController.post);

router.get('/gettest', AddressController.get); //apenas para fins de teste

module.exports = router;