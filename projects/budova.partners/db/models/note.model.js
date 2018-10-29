const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema
({
    title:  { type: String, unique:true, input_type: 'text', ru_label: 'Заголовок', minlength: [4, 'Слишком короткий заголовок'], maxlength: [50, 'Слишком длинный заголовок'],note_type:["Объект", "Страница"]},
    home_title: { type: String, input_type: 'text', ru_label: 'Подзаголовок на странице объекта'},
    page_link: { type: String, input_type: 'text', ru_label: 'Ссылка на страницу'},
    note_type:  { type: String, default: 'Объект', input_type: 'radio', enum:["Объект", "Страница"], ru_label: 'Тип объекта' , visibility:'hidden'},
    template_link:  { type: String, default: '', ru_label: 'Ссылка на шаблон', input_type: 'text', visibility:'hidden' },
    layouts:  { type: String,
                default: '',
                ru_label: 'Планировки',
                input_type: 'structure' ,
                structure_model: ["media", "text"] ,
                structure_model_ru_label: ["Планировка", "Описание планировки"] ,
                note_type:["Объект"]},
    home_background : { type: String, note_type:["Объект"], input_type: 'media'},
    gallery: { type: String, default: '', ru_label: 'Галерея', input_type: 'multimedia', note_type:["Объект", "Страница"]},
    subheading : { type: String, input_type: 'text' ,  ru_label: 'Подзаголовок', note_type:["Объект"]},
    prices_start_at : { type:  Number, input_type: 'text' ,ru_label:  'Цены от (Число)',note_type:["Объект"]},
    logo : { type: String, input_type: 'media', default: 'images/logo.png'},
    video : { type: String, input_type: 'media', default: '/video/budova.mp4', ru_label: 'Видео'},
    address: { type: String, input_type: 'text', ru_label: 'Адрес', default: 'Одесса'},
    map_iframe : { type: String, input_type: 'text', ru_label: 'Ссылка на карту', note_type:["Объект"]},
    description : { type: String, note_type:["Объект"], input_type: 'texteditor', ru_label: 'Описание дома'},
    additional_details : { type: String, input_type: 'text', ru_label: 'Дополнительная информация', default: 'Дополнительная информация'},
    additional_details_block : { type: String, input_type: 'text',  ru_label: 'Дополнительная информация Блок', note_type:["Объект"],visibility:'hidden'},
    prices_start_at_per_meter : {type: Number, input_type: 'number', ru_label: 'Цены от (у.е. за м2)'},
    // listing_details_iconblock: Array,
    // useful_links_menu_list: { type: String, input_type: 'text', note_type:["Объект"]},
    floors_quant: { type: String,  ru_label: 'Количество Этажей',
      note_type:["Объект"],input_type: 'radio', enum:["1", "2", "3", "4","5","6","7","8","9","10","11", "12", "13", "14","15","16","17","18","19","20","21", "22", "23", "24","25","26","27","28","29","30"] },
    sections_quant: { type: String, ru_label: 'Количество Секций',
       note_type:["Объект"],input_type: 'radio', enum:["1", "2", "3", "4","5","6","7","8","9","10"] },
    appart_on_floor_quant: { type: String, ru_label: 'Количество квартир на этаже',
       note_type:["Объект"],input_type: 'radio', enum:["1", "2", "3", "4","5","6","7","8","9","10"] },
    construction_type: { type: String, ru_label: 'Тип конструкции',
       note_type:["Объект"],input_type: 'radio', enum:["Монолитный каркас", "Кирпичный монолит", "Каркасно-каменный", "Панельный"] },
    frontend_material: { type: String, ru_label: 'Материалы',
       note_type:["Объект"],input_type: 'radio', default: 'Штукатурка',enum:["Штукатурка", "Сайдинг", "Декоративная штукатурка",] },
    walls: { type: String,  ru_label: 'Стены',
      note_type:["Объект"],input_type: 'radio', enum:["Газобетон 20 см", "Газобетон 40 см", "Газобетон 60 см", "Газобетон 40 см / Газобетон 20 см"], default: 'Газобетон 40 см / Газобетон 20 см' },
    windows: { type: String, ru_label: 'Окна',
       note_type:["Объект"],input_type: 'radio', enum:["Евробрус", "ПВХ"], default: 'Евробрус' },
    floor_height: { type: String,  ru_label: 'Высота потолков',
      note_type:["Объект"],input_type: 'radio', enum:["2.2", "2.4", "2.6", "2.8","3","3.2","3.4","3.6"], default: '3' },
    warming: { type: String,  ru_label: 'Отопление',
      note_type:["Объект"],input_type: 'radio', enum:["Котельная на крыше", "Котельная  подвале"], default: 'Котельная на крыше' },
    elevator: { type: String, ru_label: 'Лифт',
       note_type:["Объект"],input_type: 'radio', enum:["Пассажирский", "Грузовой", "Пассажирский / Грузовой"] ,default: 'Пассажирский / Грузовой' },
    parking: { type: String, ru_label: 'Парковка',
       note_type:["Объект"],input_type: 'radio', enum:["Подземный", "Наземный", "Наземный + Подземный"] , default: 'Наземный' },
    bldr: { type: String, ru_label: 'Застройщик',
       note_type:["Объект"],input_type: 'radio', default: 'Будова' , enum:["Будова"] },
    block: { type: String, ru_label: 'Район',
       note_type:["Объект"],input_type: 'radio', default: 'Приморский', enum:["Приморский", "Киевский", "Суворовский", "Малиновский"] },
    content: {type: String,
       note_type:["Объект"], input_type: 'texteditor', ru_label: 'Описание',visibility:'hidden'},
    counter:  { type: Number, default: 0 },
    house_deploy_time:  { type: String, default: 'Строящийся',input_type: 'radio', enum:["Строящийся", "Сдан"] ,url_params:['stroyaschiesya-doma', 'sdannye-doma'], ru_label: 'Строится или сдан', },
    house_deploy_date:  { type: String, default: '' , ru_label: 'Дата сдачи',input_type: 'datepicker',note_type:["Объект"]},

    // breadcrumbs : Array,
    // phone : { type: String, input_type: 'text'},
    // listing_title : { type: String, input_type: 'text', note_type:["Объект"]},
    // listing_text : { type: String, input_type: 'text', note_type:["Объект"]},
    // room_tags : { type: String, input_type: 'text', note_type:["Объект"]},
    // listing_price_col : { type: String, input_type: 'text', note_type:["Объект"]},
    // listing_slider : { type: String, input_type: 'text', note_type:["Объект"]},
    // listing_details : { type: String, input_type: 'text', note_type:["Объект"]},
    // listing_video : { type: String, input_type: 'text', note_type:["Объект"]},
    // map_heading : { type: String, input_type: 'text', note_type:["Объект"]},
    // subscribe : { type: String, input_type: 'text', note_type:["Объект"]},
    // weekly_offer : { type: String, input_type: 'text', note_type:["Объект"]},
    // footer_social : { type: String, input_type: 'text', note_type:["Объект"]},
    // footer_about : { type: String, input_type: 'text', note_type:["Объект"]},
    // useful_links : { type: String, input_type: 'text', note_type:["Объект"]},
    // footer_col_title : { type: String, input_type: 'text', note_type:["Объект"]},
    // contact_info : { type: String, input_type: 'text', note_type:["Объект"]},
    // notes : { type: String, input_type: 'text', note_type:["Объект"]},
    // dbtest : { type: String, input_type: 'text', note_type:["Объект"]},

    //Those above are laeving model, later ,using api, we can loop through them and update them all
}, {
    timestamps: true
});


// Supported Options
// type : ''
// default : ''
// ru_label : ''
// input_type : ["datepicker", "structure", "multimedia", "media", "text", "texteditor", ""]
// note_type : ''
// unique : ''
// minlength : ''
// maxlength : ''
// visibility : ''
// enum:["", ""]
// url_params:["", ""]




  // DEFAULT ROW
// content: {  type: String,
//             default : '',
//             ru_label : '',
//             unique: false,
//             minlength : [50, 'Превышает максимальную длину'],
//             visibility: 'visible',
//             maxlength : [50, 'Превышает максимальную длину'],
//             note_type:["Объект"],
//             input_type: 'texteditor'},




module.exports = mongoose.model('Note', NoteSchema);
