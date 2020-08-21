'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/event_repository');
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

exports.getById = async (req, res, next,) => {
    try {
        var data = await repository.getById(req.query.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next,) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            name: req.body.name,
            date: req.body.date,
            description: req.body.description,
            value: req.body.value,
            contact: req.body.contact,
            tags: req.body.tags,
        });
        res.status(201).send({ message: 'Evento cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        await repository.update(req.query.id, req.body);
        res.status(201).send({ message: "Evento atualizado com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.delete = async (req, res, next,) => {
    try {
        await repository.delete(req.query.id);
        res.status(201).send({ message: "Evento removido com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}