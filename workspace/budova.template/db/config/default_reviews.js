var Review_model = require('../models/review.model.js');
var default_reviews =  {
  lama: new Review_model({
    author : "Виктория",
    review_body : "Каждый одессит уже знает, что Будова — синоним надежной недвижимости ",
    rating : "5",
    image : 'https://openclipart.org/download/247324/abstract-user-flat-1.svg',

  }),
  anna : new Review_model({
    author : "Дарья",
    review_body : "Каждый одессит уже знает, что Будова — синоним надежной недвижимости ",
    rating : "5",
    image : 'https://openclipart.org/download/247324/abstract-user-flat-1.svg',
  }),
  ganna : new Review_model({
    author : "Светлана",
    review_body : "Каждый одессит уже знает, что Будова — синоним надежной недвижимости ",
    rating : "5",
    image : 'https://openclipart.org/download/247324/abstract-user-flat-1.svg',
  })
}
var review_controller = require('../../controllers/reviews.controller.js');
for (let review in default_reviews) {
  review_controller.registerReview(Review_model, default_reviews[review])
  }
module.exports = default_reviews;
