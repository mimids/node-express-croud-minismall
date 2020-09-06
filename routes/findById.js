var express = require('express');
var router = express.Router();
//------mongodb
// var ObjectID = require('mongodb').ObjectID;

//------mongoose
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
//-------------

/* GET users from _id. */
router.route('/:_id').get(function(req, res) {
  var path = "/"+ req.originalUrl.split('/')[1];
  var type =req.method;

// console.log('req.originalUrl : ' , req.originalUrl);

//------mongodb
// global.db.collection(actions_json[type + path].basedonne)
// .find({_id: new ObjectID(req.params._id)})
// .toArray(function(err, result) {

//------mongoose
  global.schemas[actions_json[type + path].modelName].find({_id: new ObjectId(req.params._id)}, function (err, result) {
//--------------
if (err) { throw err; }

res.render(actions_json[type + path].view,  {
title: global.actions_json[type+path].title,
libelle: actions_json[type + path].libelle,
form_action:actions_json[type + path].form_action,
data: result[0] // il n'y a qu'une réponse possible puisque requête via _id user
});
});
});
module.exports = router;