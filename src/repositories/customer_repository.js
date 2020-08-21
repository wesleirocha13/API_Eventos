'use strict'

const mongoose = require("mongoose");
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Customer.find()
    return res;
}

exports.create = async (body) => {
    var order = new Customer(body);
    await order.save();
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.update = async (id, body) => {
    await Customer
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                name: body.name,
                cnpj: body.cnpj,
                email: body.email,
                description: body.description,
            }
        });
}