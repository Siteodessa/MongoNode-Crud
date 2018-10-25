import React, { Component } from 'react';

const portfolio_links_object = {
miraton: {
  name: 'miraton.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
rexona: {
  name: 'rexona.ua',
  link: '/images/10.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
promoug: {
  name: 'miraton.ua',
  link: '/images/6.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
stroyka: {
  name: 'miraton.ua',
  link: '/images/12.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
sushieshka: {
  name: 'miraton.ua',
  link: '/images/13.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
maristella: {
  name: 'miraton.ua',
  link: '/images/7.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
shoes: {
  name: 'miraton.ua',
  link: '/images/5.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
abcdkids: {
  name: 'miraton.ua',
  link: '/images/2.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
antray: {
  name: 'miraton.ua',
  link: '/images/1.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
waterpolo: {
  name: 'miraton.ua',
  link: '/images/15.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
ikura: {
  name: 'miraton.ua',
  link: '/images/11.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
slon: {
  name: 'miraton.ua',
  link: '/images/3.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
vpn: {
  name: 'miraton.ua',
  link: '/images/14.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
plastico: {
  name: 'miraton.ua',
  link: '/images/9.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
akyurek: {
  name: 'miraton.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
novostroyi: {
  name: 'miraton.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
gemchugina: {
  name: 'miraton.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
shining: {
  name: 'shining.com.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
manhattan: {
  name: 'shining.com.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
raduzhnuy: {
  name: 'shining.com.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
masterkiev: {
  name: 'shining.com.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},
seedprocessing: {
  name: 'shining.com.ua',
  link: '/images/8.jpg',
  story: 'The website was developed at 2012 , we were responsible for web-design and online commercials',
},

};

portfolio_links_object.limap = function(obj, parcl, chicl){
  const ListItem = Object.keys(obj).map((number) =>
  <div key={number.toString()} className={parcl}><img className={chicl} src={obj[number].link} alt={obj[number].name + ' by SiteOdessa'}/> </div>
  );
  return ListItem
}





class Portfolio extends Component {
  render() {
    return (

      <div>
      <div className="portfilio">
              <div className="container">
                  <div className="flex fport">
      {portfolio_links_object.limap(portfolio_links_object, 'ports', 'tilter__image')}
      </div>
  </div>
</div>
</div>

)
}
}



export default Portfolio;
