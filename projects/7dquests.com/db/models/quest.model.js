const mongoose = require('mongoose');

const QuestSchema = mongoose.Schema
({
      title: { type: String, default: '', ru_label:'Заголовок',  input_type: 'text' },
      company_name: { type: String, default: '', ru_label:'Название компании',  input_type: 'text' },
      image: { type: String, default: '', ru_label:'Фото',  input_type: 'single_image' },
    quest_name: { type: String, default: '', ru_label:'Название квеста',  input_type: 'text' },
    min_players: { type: Number, default: '', ru_label:'Мин. игроков',  input_type: 'radio' , enum: ['1', '2', '3', '4', '5', '6', '7', '8','9','10'], default:'2'},
    max_players: { type: Number, default: '', ru_label:'Макс. игроков',  input_type: 'radio', enum: ['1', '2', '3', '4', '5', '6', '7', '8','9','10'],default:'8' },
    price: { type: Number, default: '', ru_label:'Цена',  input_type: 'number' },
    complexity: { type: Number, default: '', ru_label:'Сложность',  input_type: 'radio' , enum: ['1', '2', '3'],default:'2' },
    fear_level: { type: Number, default: '', ru_label:'Уровень страха',  input_type: 'radio' , enum: ['1', '2', '3'],default:'2' },
    age: { type: Number, default: '', ru_label:'Возраст',  input_type: 'number' },
    description: { type: String, default: '', ru_label:'Описание',  input_type: 'text' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Quest', QuestSchema);
