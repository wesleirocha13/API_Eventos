"use strict";

const mongoose = require("mongoose");
const Event = mongoose.model("Event");

exports.get = async (date) => {
  const res = await Event.find({
    date: { $gt: date },
  })
    .sort({ date: 1 })
    .populate("company address")
    .exec();
  return res;
};

exports.getByUser = async (id) => {
  const res = await Event.find({
    company: id,
  })
    .sort({ date: -1 })
    .populate("company address")
    .exec();
  return res;
};

exports.getById = async (id) => {
  const res = await Event.findById(id).populate("company address").exec();
  return res;
};

//Filtros sem autenticação
exports.getByFilter = async (value, filters) => {
  const res = await Event.find({
    category: filters.category,
    value: { $lte: value },
    date: { $gte: new Date(filters.date), $lt: new Date(filters.date2) },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterCategory = async (category, value) => {
  const res = await Event.find({
    category: category,
    value: { $lte: value },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterDate = async (filters, value) => {
  const res = await Event.find({
    value: { $lte: value },
    date: { $gte: new Date(filters.date), $lt: new Date(filters.date2) },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterValue = async (filters) => {
  const res = await Event.find({
    value: { $lte: filters.value },
  })
    .populate("company address")
    .exec();
  return res;
};

//Filtros com autenticação
exports.getByFilterAuth = async (id, filters, value) => {
  const res = await Event.find({
    company: id,
    category: filters.category,
    value: { $lte: value },
    date: { $gte: new Date(filters.date), $lt: new Date(filters.date2) },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterAuthCategory = async (id, category, value) => {
  const res = await Event.find({
    company: id,
    category: category,
    value: { $lte: value },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterAuthDate = async (id, filters, value) => {
  const res = await Event.find({
    company: id,
    value: { $lte: value },
    date: { $gte: new Date(filters.date), $lt: new Date(filters.date2) },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.getByFilterAuthValue = async (id, filters) => {
  const res = await Event.find({
    company: id,
    value: { $lte: filters.value },
  })
    .populate("company address")
    .exec();
  return res;
};

exports.create = async (body) => {
  var event = new Event(body);
  await event.save();
};

exports.update = async (id, body) => {
  if (body.image) {
    await Event.findByIdAndUpdate(id, {
      // procura pelo o id e atualiza os campos desejados
      $set: {
        name: body.name,
        description: body.description,
        category: body.category,
        date: body.date,
        value: body.value,
        contact: body.contact,
        address: body.address,
        image: body.image != "image" ? body.image : null,
      },
    });
  } else {
    if (body.remove) {
      await Event.findByIdAndUpdate(id, {
        // procura pelo o id e atualiza os campos desejados
        $set: {
          name: body.name,
          description: body.description,
          category: body.category,
          date: body.date,
          value: body.value,
          contact: body.contact,
          address: body.address,
          image: null
        },
      });
    } else {
      await Event.findByIdAndUpdate(id, {
        // procura pelo o id e atualiza os campos desejados
        $set: {
          name: body.name,
          description: body.description,
          category: body.category,
          date: body.date,
          value: body.value,
          contact: body.contact,
          address: body.address,
        },
      });
    }
  }
};

exports.delete = async (id) => {
  //Com o req.body.id ele recebe o paremtro do corpo da requisição, utilizo isso caso eu não queira exibir o id
  await Event.findByIdAndDelete(id);
};
