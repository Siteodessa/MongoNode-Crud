const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    home_title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
