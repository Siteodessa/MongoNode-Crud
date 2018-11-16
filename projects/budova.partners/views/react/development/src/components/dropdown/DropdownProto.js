import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="dropdown_menu">
        <div className="dropdown field_box block_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Район</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p><span className="circle"></span>Все районы</p>
            <p><span className="circle"></span>Малиновский район</p>
            <p><span className="circle"></span>Приморский район</p>
            <p><span className="circle"></span>Суворовский район</p>
            <p><span className="circle"></span>Киевский район</p>
          </div>
        </div>
        <div className="dropdown field_box price_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Цены до</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p><span className="circle"></span>Любая</p>
            <p><span className="circle"></span>до 30 000 $</p>
            <p><span className="circle"></span>до 40 000 $</p>
            <p><span className="circle"></span>до 60 000 $</p>
            <p><span className="circle"></span>до 100 000 $</p>
          </div>
        </div>
        <div className="dropdown field_box area_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Площадь квартир</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p><span className="circle"></span>от 30 до 40</p>
            <p><span className="circle"></span>от 40 до 50</p>
            <p><span className="circle"></span>от 50 до 60</p>
            <p><span className="circle"></span>от 70 до 80</p>
            <p><span className="circle"></span>от 80 до 90</p>
            <p><span className="circle"></span>от 90 до 100</p>
            <p><span className="circle"></span>больше 100</p>
          </div>
        </div>
        <div className="dropdown field_box rooms_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Количество комнат</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p><span className="circle"></span>1 комнатная</p>
            <p><span className="circle"></span>2 комнатная</p>
            <p><span className="circle"></span>3 комнатная</p>
          </div>
        </div>
        <div className="dropdown field_box choose_field">
            <div className="option_box" >
              <div className="label_box" >
                <span className="label">  Выбрать</span>
              </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
