const mongoose = require('mongoose');

const PageSchema = mongoose.Schema
({
    pageurl: { type: String, default: 'aaa' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Page', PageSchema);
