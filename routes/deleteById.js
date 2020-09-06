var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* DELETE user from _id into url  http://localhost:3000/deleteUser/5f4e4a349731172bfa5639ee */
router.route('/:_id').get(function(req, res) {
  var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;
  // console.log('req.originalUrl : ', req.originalUrl);
  global.schemas[actions_json[type + path].modelName].deleteOne({_id: new ObjectId(req.params._id)}, function(err, result) {
    if (err) {
      throw err;
    }
    // On refait un select après la suppression pour récupérer les enregs sans celui supprimé
    global.schemas[actions_json[type + path].modelName].find({}, function(err, result2) {
      // console.log("result into delteUser : ", result2);
      res.render(global.actions_json[type+path].view, {
        title: global.actions_json[type+path].title,
        data: result2 
      });
    });
  });
});

module.exports = router;