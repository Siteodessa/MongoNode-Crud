const mongoose = require('mongoose');

const broneSchema = mongoose.Schema
({
    timestamp: { type: Number, default: '11231' , unique:true},
    brone_time: { type: String, default: 'aaa' },
    name: { type: String, default: 'aaa' },
    phone: { type: String, default: 'aaa' },
    price: { type: String, default: 'aaa' },
    quantity: { type: String, default: 'aaa' },
    time: { type: String, default: 'aaa' },
    quest_name: { type: String, default: 'aaa' },
    company_name: { type: String, default: 'aaa' },
}, {
    timestamps: true
});

module.exports = mongoose.model('brone', broneSchema);
