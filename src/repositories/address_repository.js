'use strict'

const mongoose = require("mongoose");
const Address = mongoose.model('Address');

exports.get = async () => {
    const res = await Address.find()
    return res;
}

exports.getById = async (id) => {
    const res = await Address.findById(id);
    return res;
}

exports.getByUser = async (user) => {
    const res = await Address
        .find({
            company: user
        });
    return res;
}

exports.create = async (body) => {
    var address = new Address(body);
    await address.save();
}

exports.update = async (id, body) => {
    await Address
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                state: body.state,
                city: body.city,
                district: body.district,
                street: body.street,
                number: body.number,
                cep: body.cep,
            }
        });
}

exports.delete = async (id) => {
    //Com o req.body.id ele recebe o paremtro do corpo da requisição, utilizo isso caso eu não queira exibir o id
    await Address
        .findByIdAndDelete(id);
}