const mongoose = require('mongoose');

const QuestSchema = mongoose.Schema
({
    title: { type: String, default: '' },
    company_name: { type: String, default: '' },
    min_players: { type: String, default: '' },
    max_players: { type: String, default: '' },
    price: { type: String, default: '' },
    complexity: { type: String, default: '' },
    fear_level: { type: String, default: '' },
    age: { type: String, default: '' },
    description: { type: String, default: '' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Quest', QuestSchema);
