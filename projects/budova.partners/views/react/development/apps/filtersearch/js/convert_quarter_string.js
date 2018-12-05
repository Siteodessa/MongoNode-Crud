import get_year_quarter from './get_year_quarter'

const convert_quarter_string = (datestring) => {
  if (typeof(datestring) === 'undefined' || datestring === null || datestring === '') { return }
  return '' + get_year_quarter(datestring.split('/')[0]) + ' ' + datestring.split('/')[2] + 'г'
}


export default convert_quarter_string
