type_n_log = (a) => {
  let b = typeof(a);
  console.log(b);
  console.log("~~~~~~~~");
  console.log(a);
  console.log("~~~~~~~~");
  for (let prop in a) {
    console.log(prop);
  }
}
IsParseableJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


express_page = (db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson) => {
  app.get(pageurl, function(req, res) {
      d = {};
      dbmodel.find({}, function(err, data) {
          app.use(express.static('views'));
          data.forEach(elem => {
            if (elem.id == db_id)
            for (let prop in elem) {
                if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
                else { d[prop] = elem[prop] }
              }
            }
          );

          res.status(200).render(ejs_file, {
              d: d
          });
      });
  });
}
