'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },

    state: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    street: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        required: true,
    },

    cep: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Address', schema);