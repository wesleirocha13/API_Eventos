'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
const router = express.Router();


// Conecta no banco

mongoose.connect(config.connectionString , { useNewUrlParser: true, useUnifiedTopology: true });

//Carrega models
const Product = require('./models/product_model');
const Customer = require('./models/customer_model');
const Order = require('./models/order_model');
const Event = require('./models/event_model');

// Carrga as rotas
const indexRoute = require('./routes/index_route');
const productRoute = require('./routes/product_route');
const customerRoute = require('./routes/customer_route');
const orderRoute = require('./routes/order_route');
const eventRoute = require('./routes/event_route');

app.use(cors());
app.use(bodyParser.json({
    limit: '5mb' //Esse limit almenta o tamanho do json, isso pode evitar problemas quanto se tem o uso de imagens
}));
app.use(bodyParser.urlencoded({ extended: false }));

//Hbilita o CORS
/*app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
}); */



app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
app.use('/events', eventRoute);

module.exports = app;