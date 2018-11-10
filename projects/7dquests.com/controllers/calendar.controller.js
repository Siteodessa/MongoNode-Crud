

function day_table(days_passed = 0) {
  const Brone_m = require('../db/models/brone.model');
  this.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * days_passed)

    this.formatDate = function (timestamp) {
        return this.formatDays(timestamp) + ' ' + this.formatDays(formatTime)
        }
    this.formatDays = function (timestamp) {
          date = new Date(timestamp);
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear()
        if (yy < 10) yy = '0' + yy;
        return yy + '-' + mm + '-' + dd
        }
    this.formatTime = function (timestamp) {
        date = new Date(timestamp);
        var hh = date.getHours(); if (hh < 10 ) { hh = '0' + hh }
        var min = date.getMinutes();if (min < 10 ) { min = '0' + min }
        var sec = date.getSeconds();if (sec < 10 ) { sec = '0' + sec }
        return hh + ':' + min
        }


    this.zero_hour = this.date.setHours(0,0,0)
    this.is_weekend = function () {  return this.date.getDay() === 0 || this.date.getDay() === 7}
    this.first_timestamp = function () { if (!this.is_weekend()) { return this.zero_hour + (10 * 3600000) + 1800000 } else { return this.zero_hour + (12 * 3600000) } }
    this.number_of_games_today = function () { !this.is_weekend() ?  this.number_of_games = 10 : this.number_of_games = 9; return this.number_of_games }
    this.print_days = function (first_timestamp, number_of_games) {
      first_timestamp = first_timestamp()
      number_of_games = number_of_games()
      let result = [];
      let result_object = {};
      for (let i = 0; i < number_of_games; i++) {
        result.push((5400000 * i) + first_timestamp)
      }
      result.map(timestamp => {
        result_object[timestamp] = {
        date : this.formatDays(timestamp),
        time : this.formatTime(timestamp),
        is_free : true,
        price : false,
        your_slot_id : 123
        }
      })
    return Object.values(result_object)
    }
    return this
  }

const Sync_schedules = (schedule, brones) => {
  this.setAvailability = function (schedule, brones) {
    schedule.forEach(sched => {
    brones.forEach(brone => {
      if (sched.date === brone.brone_time && sched.time === brone.time) {
        sched.is_free = false
      }
    });
    });

    return schedule;
  }
  this.setPrice = function (schedule, brones) {
    schedule.map(sched => {
      switch (sched.time) {
        case '00:00':
          sched.time = '23:59'
          sched.price = 900
          break;
        case '18:00':
        case '19:30':
        case '21:00':
        case '22:30':
        sched.price = 800
          break;
        default:
          sched.price = 600
      }
    })
    return schedule;
  }
  this.sync_brone_date = function ( brones ) {
    let result = brones.map(brone => {
        brone.brone_time =  brone.brone_time.split(' ')[0]
        return brone
      })
    return result
  }
  this.sync = function () {
    brones = this.sync_brone_date(brones)
    schedule = this.setAvailability(schedule, brones)
    schedule = this.setPrice(schedule, brones)
    return schedule
  }
  return this
}

  exports.scheduler = (days_number, brones = []) => {
    let single_day, ts, ng; let schedule = []
    for (let i = 0; i < days_number; i++) {
      single_day = day_table(i)
      ts = single_day.first_timestamp
      ng = single_day.number_of_games_today
      single_day = single_day.print_days(ts,ng)
      schedule = schedule.concat(single_day)
    }
    let sync = Sync_schedules(schedule, brones).sync()
    return schedule
  }
