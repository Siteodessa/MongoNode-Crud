module.exports = (core, api_c, notes, subscribe_c, brone_c, reviews, quests, quests_m) => {
  let app = core.app;
  let express = core.express;
  app.post('/notes', notes.create);
  app.post('/subscribe', subscribe_c.create);
  app.post('/brones', brone_c.create);
  app.post('/reviews', reviews.create);
  app.get('/notes', notes.findAll);
  app.get('/notes/:noteId', notes.findOne);
  app.put('/notes/:noteId', notes.update);
  app.put('/notes/m_update/:noteId', notes.custom_update);
  app.delete('/notes/:noteId', notes.delete);
  app.post('/quests', quests.create);
  app.get('/questsAll', quests.findAll);
  app.put('/quests/:noteId', quests.update);
  app.put('/quests/m_update/:noteId', quests.custom_update);
  app.delete('/quests/:noteId', quests.delete);

  app.get('/api/mk/*', api_c.mir_kvestov_schedule);
  app.post('/api/mk/*', api_c.mir_kvestov_brone);

  app.get('/api/qr/*', api_c.questroom_api);
  app.post('/api/qr/*', api_c.questroom_api);


let qr_c = require('../controllers/qr.controller');
  app.get('/api/qrtest', qr_c.showDay_any);


  app.get('/test/*', require('../controllers/qr.controller').showDays_all);
}
