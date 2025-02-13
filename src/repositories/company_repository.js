'use strict'

const mongoose = require("mongoose");
const Company = mongoose.model('Company');

exports.get = async () => {
    const res = await Company.find()
    return res;
}

exports.getById = async (id) => {
    const res = await Company.findById(id);
    return res;
}

exports.getBycnpj = async (cnpj) => {
    const res = await Company
        .findOne({
            cnpj: cnpj,
        }, "_id");
    return res;
}

exports.create = async (body) => {
    var order = new Company(body);
    let response;
    await order.save((err, doc)=>{
        response = {err, doc};
    });
    return response;
}

exports.authenticate = async (data) => {
    const res = await Company.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.authenticatePassword = async (data) => {
    const res = await Company.findOne({
        cnpj: data.cnpj,
        password: data.password
    });
    return res;
}

exports.fogotPassword = async (data) => {
    const res = await Company.findOne({
        email: data.email,
        cnpj: data.cnpj,
    });
    return res;
}

exports.updatePassword = async (data) => {
    await Company
        .findByIdAndUpdate(data.id, {
            $set: {
                password: data.password,
            }
        });
}

exports.update = async (id, body) => {
    await Company
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                name: body.name,
                cnpj: body.cnpj,
                email: body.email,
                description: body.description,
                roles: body.roles
            }
        });
}