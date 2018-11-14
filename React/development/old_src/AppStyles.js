import { StyleSheet } from 'aphrodite/no-important'
import { blackSquare } from './squareStyles'
//He can do crossbrowser prexifing, but looks like it 's switched off by default for now'
export default StyleSheet.create({
  addTrack: {
      background: 'green',
      color: 'white',
      display: 'flex',
  },
  square: {
...blackSquare,
width:'50px'
,height:'50px'
    }

})
