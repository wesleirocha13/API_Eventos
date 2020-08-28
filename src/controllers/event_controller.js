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

exports.getById = async (req, res, next,) => {
    try {
        var data = await repository.getById(req.query.id);
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getByFilter = async (req, res, next,) => {
    try {
        var data = await repository.getByFilter(req.query);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getByFilterAuth = async (req, res, next,) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dados = await authService.decodeToken(token);
        var data = await repository.getByFilterAuth(dados.id, req.query);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next,) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.create(req.body);
        res.status(201).send({ message: 'Evento cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}

exports.postTeste = async (req, res, next,) => {
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Evento cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        await repository.update(req.body.id, req.body);
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