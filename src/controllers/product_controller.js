'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/products_repository');

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

exports.getBySlug = async (req, res, next,) => {
    try {
        var data = await repository.getBySlug(req.query.slug);
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

exports.getByTag = async (req, res, next,) => {
    try {
        var data = await repository.getByTag(req.query.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next,) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    // Se eu quiser ao invés de colocar o req.body aqui eu posso passar parametro por paramentro 
    //Ex: product.title = req.body.title e assim sucessivamente
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        await repository.update(req.query.id, req.body);
        res.status(201).send({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.delete = async (req, res, next,) => {
    try {
        await repository.delete(req.body.id);
        res.status(201).send({ message: "Produto removido com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}