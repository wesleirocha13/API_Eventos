'use strict'

const mongoose = require("mongoose");
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order.find({}, 'number status customer itens').populate('customer', 'name email')
    .populate('itens.product', 'title price');
    return res;
}

exports.create = async (body) => {
    var customer = new Order(body);
    await customer.save();
}