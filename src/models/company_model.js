'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    cnpj: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false
    },

    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],

});

module.exports = mongoose.model('Company', schema);