const mongoose = require('mongoose');

const subscriber = mongoose.Schema
({
    mail: { type: String, default: 'Неизвестный' , unique: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscribe', subscriber);
