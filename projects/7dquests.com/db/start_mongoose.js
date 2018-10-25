module.exports = (mongoose, dbConfig) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbConfig.url,{ useNewUrlParser: true }) .then(() => {    console.log("db:ok");}) .catch(err => {    console.log('db:false');});
  mongoose.set('useCreateIndex', true);
  //    process.exit();
}
