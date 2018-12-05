
const get_year_quarter = (month_number) => {
  switch (month_number) {
  case '01':
  case '02':
  case '03':
    return '1 квартал'
    break;
  case '04':
  case '05':
  case '06':
    return '2 квартал'
    break;
  case '07':
  case '08':
  case '09':
  return '3 квартал'
  break;
  case '10':
  case '11':
  case '12':
  return '4 квартал'
  break;
  default:
    return ''
}
return month_number
}



export default get_year_quarter
