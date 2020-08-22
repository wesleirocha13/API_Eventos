'use strict'

const mongoose = require("mongoose");
const Event = mongoose.model('Event');

exports.get = async () => {
    const res = await Event.find().populate('Company', 'name email');
    return res;    
}

exports.getById = async (id) => {
    const res = await Event.findById(id);
    return res;
}

exports.create = async (body) => {
    var event = new Event(body);
    await event.save();
}

exports.update = async (id, body) => {
    await Event
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                name: body.name,
                description: body.description,
                category: body.category,
                date: body.date,
                value: body.value,
                contact: body.contact,
                tags: body.tags,
            }
        });
}

exports.delete = async (id) => {
    //Com o req.body.id ele recebe o paremtro do corpo da requisição, utilizo isso caso eu não queira exibir o id
    await Event
        .findOneAndRemove(id);
}