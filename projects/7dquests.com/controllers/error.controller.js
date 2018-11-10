
exports.error = (res, message) => {
  res.status(500).send({
      message: message || 'Something weird happened'
  });
}
