'use strict'

const ValidationContract = require('../validator/fluent_validator');
const repository = require('../repositories/company_repository');
const repositoryAddress = require('../repositories/address_repository');
const md5 = require('md5');
const authService = require('../services/auth_service');

exports.get = async (req, res, next,) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error,
        });
    }
}

exports.getById = async (req, res, next,) => {
    try {
        var data = await repository.getById(req.query.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error,
        });
    }
}

exports.post = async (req, res, next,) => {
    try {
        await repository.create(req.body.company);
        const idCompany = await repository.getBycnpj(req.body.company.cnpj);
        await repositoryAddress.create({
            company: idCompany._id,
            state: req.body.address.state,
            city: req.body.address.city,
            district: req.body.address.district,
            street: req.body.address.street,
            number: req.body.address.number,
            cep: req.body.address.cep,
        });
        res.status(201).send({ message: 'Compania cadastrada com sucesso!', });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}

exports.authenticate = async (req, res, next,) => {
    try {
        const company = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
        });

        if (!company) {
            res.status(404).send({
                message: 'Email ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: company._id,
            cnpj: company.cnpj,
            email: company.email,
            nome: company.name,
            description: company.description,
            roles: company.roles,
        });

        res.status(201).send({
            token: token,
            data: {
                email: company.email,
                name: company.name
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}

exports.refreshToken = async (req, res, next,) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const company = await repository.getById(data.id);
        if (!company) {
            res.status(404).send({
                message: 'Compania não encontrada.'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: company._id,
            cnpj: company.cnpj,
            email: company.email,
            nome: company.name,
            description: company.description,
            roles: company.roles
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: company.email,
                name: company.name
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dados = await authService.decodeToken(token);
        await repository.update(dados.id, req.body);
        res.status(201).send({ message: "Cadastro removido com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error
        });
    }
}
