'use strict'

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller');
const authService = require('../services/auth_service');

router.get('/', ProductController.get);
router.get('/slug/', ProductController.getBySlug);
router.get('/id/', ProductController.getById);
router.get('/tags/', ProductController.getByTag);
// Intercepta a rota e só deixa passar se tiver feito autenticação
router.post('/', authService.isAdmin, ProductController.post); 
router.put('/', authService.isAdmin, ProductController.put);
router.delete('/', authService.isAdmin, ProductController.delete);

module.exports = router;