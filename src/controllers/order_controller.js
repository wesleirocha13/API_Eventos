'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/order_repository');
const guid = require('guid');
const authService = require('../services/auth_service');

exports.get = async (req, res, next,) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next,) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.itens, 'O campo itens é obrigatório');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    // Se eu quiser ao invés de colocar o req.body aqui eu posso passar parametro por paramentro 
    //Ex: product.title = req.body.title e assim sucessivamente
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}