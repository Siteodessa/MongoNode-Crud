module.exports = (app, express, bodyParser, d) => {
    const notes = require('../controllers/note.controller.js');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);


    app.set('view engine', 'ejs');
    app.get('/', (req, res) => {
      app.use(express.static('views'));

      d.dbtest = 'dbtest:false'
      res.render('index', {d: d});
    });
    app.get('/dbtest', (req, res) => {

      res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});


    });


app.listen(80, () => console.log('Example app listening on port 80!'));



}
