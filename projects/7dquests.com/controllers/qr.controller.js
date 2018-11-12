const Calendar_c = require('./mk.controller');
exports.showDays_all = (req, res) => {
    let schedule = Calendar_c.scheduler(10, req.brones)
    console.log(schedule);
    res.status(200).send(schedule)
 }
exports.listen_showDay_any = (req, res) => {


 }
exports.listen_showHour = (req, res) => {


 }
exports.bookingHour = (req, res) => {


 }
