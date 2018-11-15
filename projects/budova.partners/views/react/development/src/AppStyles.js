import { StyleSheet } from 'aphrodite/no-important'
import { timeline_item } from './timeline_item'
//He can do crossbrowser prexifing, but looks like it 's switched off by default for now'
export default StyleSheet.create({
  addCard: {
      background: '#eee',
      color: 'white',
      display: 'flex',
  },
  transparent: {
      opacity: '0',
      display: 'none'
  },
  preloader: {
...timeline_item,
    }

})
