'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/address_repository');
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

exports.getByUser = async (req, res, next,) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dados = await authService.decodeToken(token);

        var data = await repository.getByUser(dados.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next,) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.cep, 'O campo itens é obrigatório');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    // Se eu quiser ao invés de colocar o req.body aqui eu posso passar parametro por paramentro 
    //Ex: product.title = req.body.title e assim sucessivamente
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Endereço cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        await repository.update(req.query.id, req.body);
        res.status(201).send({ message: "Endereço atualizado com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.delete = async (req, res, next,) => {
    try {
        await repository.delete(req.query.id);
        res.status(201).send({ message: "Endereço removido com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}