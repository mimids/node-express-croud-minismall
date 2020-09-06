var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/* Insert one new user into database. */
router.route('/').get(function (req, res) {
    var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;
    // console.log('req.originalUrl : ', req.originalUrl);
    if (!req.query.hasOwnProperty("_id")) req.query._id = new ObjectId();
    global.schemas[actions_json[type + path].modelName].create([req.query],
        function (err, result) {
            if (err) {
                throw err;
            }
            // console.log('createUser mongoose: ', result);
            res.render('modifyUser', {
                title: 'Creating User without error with datas below :',
                data: result[0]  // Mongoose renvoie toujours un tableau
            });
        } // fin callback de l'insert
    ); // fin de l'insert()
}); // fin de la gestion de la route

router.route('/').post(function (req, res) {
    var path = "/" + req.originalUrl.split('/')[1];
    var type = req.method;
    // console.log('req.originalUrl : ', req.originalUrl);
    // On doit créer via Mongoose un _id pour faire l'insertion dans la base
    if (!req.query.hasOwnProperty("_id")) req.body._id = new ObjectId();
    global.schemas[actions_json[type + path].modelName].create([req.body],
        function (err, result) {
            if (err) {
                throw err;
            }
            // console.log('createUser mongoose: ', result[0]);
            res.render(actions_json[type + path].view, {
                title: actions_json[type + path].title,
                data: result[0]
            });
        } // fin callback de l'insert
    ); // fin de l'insert()
}); // fin de la gestion de la route
module.exports = router;