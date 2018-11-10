const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema
({

task:  {
    type: String,
    minlength: [4, 'Short task'],
    maxlength: [500, 'Long task'],
    default:'task not set',
    ru_label: 'Задание',
    input_type: 'text'
  },
task_desc:  {
    type: String,
    minlength: [4, 'Short task_desc'],
    maxlength: [500, 'Long task_desc'],
    default:'task_desc not set',
    ru_label: 'Описание задания',
    input_type: 'text'
  },
task_status:  {
    type: String,
    minlength: [4, 'Short task_desc'],
    maxlength: [500, 'Long task_desc'],
    enum: ['Срочное','Важное','Нужное','Готовое','Ожидание'],
    default:'task_desc not set',
    ru_label: 'Описание задания',
    input_type: 'text'
  },


  }, {
      timestamps: true
  });

  module.exports = mongoose.model('Task', TaskSchema);
