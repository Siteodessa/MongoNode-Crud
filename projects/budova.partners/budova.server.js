let express = require('express');
let app = express();

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  app.use(express.static('views'));


  var d = require('./model/index');
  res.render('index', {d: d});
});




app.listen(80, () => console.log('Example app listening on port 80!'));

var question = 'question'
module.exports = question;
