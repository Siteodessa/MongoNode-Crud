module.exports = (app, express, bodyParser, d) => {
    const notes = require('../controllers/note.controller.js');
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.post('/notes', notes.create);    // Create a new Note
    app.get('/notes', notes.findAll);    // Retrieve all Notes
    app.get('/notes/:noteId', notes.findOne);    // Retrieve a single Note with noteId
    app.put('/notes/:noteId', notes.update);    // Update a Note with noteId
    app.delete('/notes/:noteId', notes.delete);    // Delete a Note with noteId
    app.set('view engine', 'ejs');
    app.get('/', (req, res) => {
      app.use(express.static('views'));
      res.status(200).render('index', {d: d});
    });



app.listen(80, () => console.log(d.title + ' application is running port 80!'));
}
