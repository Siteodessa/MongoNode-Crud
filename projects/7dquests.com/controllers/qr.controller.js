const Calendar_c = require('./mk.controller');
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique );

const get_days_all = (schedule)  => {
      let result = {}
      let dates = []
      schedule.map( elem => {
      dates.push(elem.date)
      });
      dates  = dates.filter( onlyUnique )
      let the_elem;
      let is_booked;
      dates.map( elem => {
        result[elem] = {"result":2,"times": 4}
        the_elem = result[elem] = {"result":2,"times": null}
        the_elem["dates"] = {}
        the_elem["dates"][String(elem)] = {"date": elem}
        the_elem["times"] = {}
        schedule.map( sched => {
          if (elem === sched.date) {
          Boolean(sched.is_free) ?  is_booked = 2 : is_booked = 1
              the_elem["times"][String(sched.time)] = {"time": sched.time, "price": sched.price, "is_booked": is_booked}
          }
        });
      });
      return result
}

const get_day_any = (schedule, the_date)  => {
  for (let prop in schedule) {
      if (prop !== the_date) {
        delete schedule[prop]
      }
  }
    return schedule
}

const get_hour = (schedule, the_time, the_date)  => {
  let obj = schedule[the_date]["times"]
  for (let prop in obj) {
      if (prop !== the_time) {
        delete obj[prop]
      }
  }
  obj = schedule
  return schedule
}

exports.showDays_all = (req, res) => {
    let schedule = Calendar_c.scheduler(10, req.brones)
    result = get_days_all(schedule)
    res.status(200).send(JSON.stringify(result))
 }
exports.showDay_any = (req, res) => {
  let schedule = Calendar_c.scheduler(10, req.brones)
  let result = get_days_all(schedule)
  result = get_day_any(result, req.body.date)

  res.status(200).send(JSON.stringify(result))
 }
exports.showHour = (req, res) => {
  let schedule = Calendar_c.scheduler(10, req.brones)
  let result = get_days_all(schedule)
  result = get_day_any(result, req.body.date)
  result = get_hour(result, req.body.time, req.body.date)
  res.status(200).send(JSON.stringify(result))
 }
exports.bookingHour = (req, res) => {
 }
