module.exports = (cf) => {
  console.log('default notes...');
  let app = cf.app;
  let notes = cf.notes;
  app.post('/notes', notes.create);
  app.get('/notes', notes.findAll);
  app.get('/notes/:noteId', notes.findOne);
  app.put('/notes/:noteId', notes.update);
  app.put('/cupdate/:noteId', notes.custom_update);
  app.delete('/notes/:noteId', notes.delete);
  app.get('/fileupload', notes.upload);

};
