var express = require('express');
var router = express.Router();
//------mongodb
// var ObjectID = require('mongodb').ObjectID;

//------mongoose
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
//-------------
/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').get(function (req, res) {
  var path = "/" + req.originalUrl.split('/')[1];
  var type = req.method;
//mongodb---------------
  // global.db.collection(actions_json[type + path].basedonne).update(
    // { _id: new ObjectID(req.params._id) },
    // { $set: req.query },
    // function (err, result) {
//------mongoose
global.schemas[actions_json[type + path].modelName].update({_id: new ObjectId(req.params._id)},{ $set: req.query }, function (err, result) {
  //---------

      if (err) { throw err; }
//mongodb---------------
      // global.db.collection(actions_json[type + path].basedonne).find({
      //   _id: new ObjectID(req.params._id)
      // }).toArray(function (err, result) {
//------mongoose
global.schemas[actions_json[type + path].modelName].find({_id: new ObjectId(req.params._id)}, function (err, result) {
  //---------

        if (err) { throw err; }

        res.render(actions_json[type + path].view, {
          title: 'Formateur modified without error',
          data: result[0]
        });
      }); // fin du find() après update
    } // fin callback de l'update
  ); // fin de l'update()
}); // fin de la gestion de la route



/* SET user from _id with new data for an update into mongoDB . */
router.route('/:_id').post(function (req, res) {
  var path = "/" + req.originalUrl.split('/')[1];
  var type = req.method;
//mongodb---------------
  // global.db.collection(actions_json[type + path].basedonne).update(
    // { _id: new ObjectID(req.params._id) },
    // { $set: req.query },
    // function (err, result) {
//------mongoose
global.schemas[actions_json[type + path].modelName].update({_id: new ObjectId(req.params._id)},{ $set: req.body }, function (err, result) {
  //---------
      if (err) { throw err; }
//mongodb---------------
      // global.db.collection(actions_json[type + path].basedonne).find({
      //   _id: new ObjectID(req.params._id)
      // }).toArray(function (err, result) {
//------mongoose
global.schemas[actions_json[type + path].modelName].find({_id: new ObjectId(req.params._id)}, function (err, result) {
  //---------

        if (err) { throw err; }

        res.render(actions_json[type + path].view, {
          title: actions_json[type + path].title,
          data: result[0]
        });
      }); // fin du find() après update
    } // fin callback de l'update
  ); // fin de l'update()
}); // fin de la gestion de la route



module.exports = router;