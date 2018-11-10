var Sitedata = require('../models/sitedata.model.js');
var default_sitedata =  {
  project: new Sitedata({
    sitename: 'Budova.partners',
    logo: '/images/logo.png',
    phone: '+380936460780',
    mail: 'mail.mail',
    address: 'adress',
    fb_link: 'fblink',
    insta_link: 'instalink',
    twitter_link: 'twitterlink',
    subscribe_heading: 'Подпишитесь на наши новости!',
    subscribe_subheading: 'Узнайте обо всем первыми',
    subscribe_placeholder: 'Ваш e-mail',
    subscribe_data_error: 'E-mail некорректен',
    subscribe_text: 'подписаться',
    weekly_offer_heading: 'Предложение недели',
    weekly_offer_background: '/images/weekly.jpg',
    weekly_offer_prize: '/images/prize.svg',
    footer_description: 'Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст Аня сюда напишет текст  ',
    new_houses_background: '/images/altair3.jpg',
    new_houses_title: 'Строящиеся дома',
    old_houses_background: '/images/altair3.jpg',
    old_houses_title: 'Сданные дома',
    prices_page_title: 'Цены',
    prices_page_background: '/images/altair3.jpg',
    about_page_title: 'О нас заголовок',
    about_page_subtitle: 'О нас подзаголовок',
    about_page_desc: 'ЖК «Звездный городок 2», ЖК «Гольфстрим», ЖК «Бельэтаж», ЖК «Альтаир», ЖК»Апельсин», ЖК «Дом на Осипова» — эти известные потрясающие жилые комплексы уже радуют жильцов и покаряют сердца тех, кто только собирается приобрести квартиру от СК «Будова». Ведь все уже знают Одесского застройщика, одного из первопроходцев на рынке новостроек «СК Будова», потому что на протяжении 20 лет компания ведет выдающуюся строительную деятельность на территории Одессы и за ее пределом. Радовать и вдохновлять своей красотой, вот один из немалоажных аспектов, которыми рукодствуется СК «Будова»! Для тех, кто ценит не только красивое, но и качественное жилье, высокий уровень комфорта и доступные цены вашему вниманию предоставляются новостройки Одессы от СК» Будова».Все дома имеют развитую инфраструктуру.',
    about_page_desc1: 'Благоустроенная придомовая территрия, игровые площадки для детей, специальные отведенные места для отдыха жильцов и их гостей,красивейшая парковая зона и многочисленные места для парковки, все оборудовано и продумано до мелочей. С предвкушением и нетерпением ожидаются новые строящееся комплесы от СК «Будова». ЖК «Горизонт», ЖК «Омега», ЖК «Орион», ЖК «Альтаир2», ЖК «Новый Берег», ЖК «Скай Сити», ЖК «Мандарин», ЖК «4 Сезона», ЖК «Михайловский городок» такие все разные и одновременно потрясающие новые объекты от СК «Будова», скоро порадуют наши семьи, наших гостей города и наши сердца.',
    about_page_desc2: ' Новые объекты от СК «Будова» сдаются всегда в срок, располагаются в разных районах и конечно продаются по доступным ценам! Если у вас в приоритете преобрести квартиру в современном, качественном, новом жилом комплексе города Одессы – Звоните и сделайте себя и свих близких счастливыми, ведь вы достойны лучшего! А лучшее сегодня- это квартиры от СК «Будова»! Партнер СК «Будова» — мы всегда с Вами.',
    about_page_background: '/images/home_background.jpg',
    about_page_side_image: '/images/intro.png',
    contacts_page_background: '/images/contact.jpg',
    contacts_page_title: 'Контакты',
    contacts_page_form_title: 'Напишите нам',
    contacts_page_contact_title: 'Контакты',
    contacts_page_about_title: 'О нас',
    contacts_page_about_desc: 'Мы - самая лучшая компания на свете',
    contacts_page_about_map: 'Контакты'
  })
}

//
Sitedata.find({sitename: default_sitedata.project.sitename})
        .then(sites => {
            if (sites.length == 0) {
              default_sitedata.project.save(function(err, savedUser){
                if (err) {  console.log(err); }
              console.log('Default Site Info has been registered');
              })
            }
            else {
              console.log(default_sitedata.project.sitename + ':ok');
            }
        })
        .catch(err => {
            console.log('error occured while searching sitedata');
        });
module.exports = default_sitedata;
