
exports.findAll = (req, res) => { // Retrieve and return all reviews from the database.
    Review.find()
    .then(reviews => {
        res.status(200).send(reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews."
        });
    });
};
