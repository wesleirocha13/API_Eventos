'use strict'

const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/company_controller');
const authService = require('../services/auth_service');

router.get('/', CompanyController.get);
router.get('/id', CompanyController.getById);
router.post('/', CompanyController.post);
//Rota criada para realizar login
router.post('/authenticate', CompanyController.authenticate);
router.post('/refresh-token', authService.authorize, CompanyController.refreshToken);
router.put('/', authService.authorize, CompanyController.put);

router.post('/postteste', CompanyController.post); //apenas para fins de teste

module.exports = router;