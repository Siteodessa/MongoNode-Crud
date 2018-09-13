const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema
({
    author: { type: String, default: 'Неизвестный' },
    review_body: { type: String, default: 'Мне все понравилось' },
    rating: { type: String, default: '5' },
    image: { type: String, default: 'https://openclipart.org/download/247324/abstract-user-flat-1.svg' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);
