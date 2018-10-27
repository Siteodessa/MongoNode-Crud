const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema
({
    author: { type: String, default: 'Неизвестный' ,input_type: 'text'},
    review_body: { type: String, default: 'Мне все понравилось', input_type: 'texteditor' },
    rating: { type: Number, default: '5', enum:["1", "2", "3", "4", "5",] ,input_type: 'radio'},
    image: { type: String, default: 'https://openclipart.org/download/247324/abstract-user-flat-1.svg' ,input_type: 'media'},
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);
