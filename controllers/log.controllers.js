const User = require('../models/user.model');
const Log = require('../models/log.model');

module.exports.viewLog = (req, res, next) => {
  const { id } = req.params;
 Log.findById(id)
 .then((log) => {

  res.render('detail', {log: log})
 })
}