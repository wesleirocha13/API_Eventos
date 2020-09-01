'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/event_repository');
const authService = require('../services/auth_service');

exports.get = async (req, res, next,) => {
    try {
        var date = new Date();
        var data = await repository.get(date);
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
        if(req.query.date == "2020-01-01T03:00:00.000Z" && req.query.category != 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterCategory(req.query.category, value); //Pesquisar sem a data

        }else if(req.query.date != "2020-01-01T03:00:00.000Z" && req.query.category == 'categoryNull') {
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterDate(req.query, value); //Pesquisar sem categoria

        }else if(req.query.date == "2020-01-01T03:00:00.000Z" && req.query.category == 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterValue(req.query); //Pesquisar somente valor   

        }else if(req.query.date != "2020-01-01T03:00:00.000Z" && req.query.category != 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilter(value, req.query); //Pesquisar com todos os campos
        }
        console.log(data)
       // var data = await repository.getByFilter(req.query);
        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getByFilterAuth = async (req, res, next,) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dados = await authService.decodeToken(token);
        if(req.query.date == "2020-01-01T03:00:00.000Z" && req.query.category != 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterAuthCategory(dados.id, req.query.category, value); //Pesquisar sem a data

        }else if(req.query.date != "2020-01-01T03:00:00.000Z" && req.query.category == 'categoryNull') {
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterAuthDate(dados.id, req.query, value); //Pesquisar sem categoria

        }else if(req.query.date == "2020-01-01T03:00:00.000Z" && req.query.category == 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterAuthValue(dados.id, req.query); //Pesquisar somente valor   

        }else if(req.query.date != "2020-01-01T03:00:00.000Z" && req.query.category != 'categoryNull'){
            var value;
            if(req.query.value == ''){
                value = 99999
            }else{
                value = req.query.value;
            }
            var data = await repository.getByFilterAuth(dados.id, req.query, value); //Pesquisar com todos os campos
        }

        res.status(200).send(data);
    } catch (error) {
        console.log(error)
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