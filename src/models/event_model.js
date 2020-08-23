'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true,
    },

    value: {
        type: Number,
        required: true,
        min: 0
    },

    contact: {
        type: String,
        required: true,
        trim: true
    },

    tags: [{
        type: String,
        required: true
    }],

});

module.exports = mongoose.model('Event', schema);