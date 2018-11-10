module.exports = (mongoose, dbConfig) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConfig.url) .then(() => {    console.log("db:ok");}) .catch(err => {    console.log('db:false');});
  //    process.exit();
}
