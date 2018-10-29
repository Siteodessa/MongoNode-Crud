module.exports = (cf) => {


  let app = cf.app;
  let Task_c = cf.Task_c;




  app.post('/task_management',Task_c.create)
  app.get('/task_management',Task_c.findAll);
  app.get('/task_management/:noteId',Task_c.findOne);
  app.put('/task_management/:noteId',Task_c.update);
  app.put('/cupdate/:noteId',Task_c.custom_update);
  app.delete('task_management/:noteId',Task_c.delete);



}
